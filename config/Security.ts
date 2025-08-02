import compression from 'compression';
import cors from 'cors';
import { Application } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

class Security {
  static configure(app: Application): void {
    // CORS configuration
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Correlation-ID'],
        credentials: true,
        maxAge: 86400, // 24 hours
      })
    );

    // Compression middleware
    app.use(
      compression({
        level: parseInt(process.env.COMPRESSION_LEVEL || '6'),
        threshold: parseInt(process.env.COMPRESSION_THRESHOLD || '1024'),
        filter: (req, res) => {
          if (req.headers['x-no-compression']) {
            return false;
          }
          return compression.filter(req, res);
        },
      })
    );

    // Security headers
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ['\'self\''],
            styleSrc: ['\'self\'', '\'unsafe-inline\''],
            scriptSrc: ['\'self\''],
            imgSrc: ['\'self\'', 'data:', 'https:'],
          },
        },
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },
      })
    );

    // Global rate limiting
    const globalLimiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
      message: {
        error: 'Too many requests from this IP, please try again later.',
        success: false,
        data: {},
        message: 'Rate limit exceeded',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

    // Apply global rate limiting to all routes
    app.use(globalLimiter);

    // Additional security middleware
    app.use((req, res, next) => {
      // Remove X-Powered-By header
      res.removeHeader('X-Powered-By');

      // Add custom security headers
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');

      next();
    });
  }

  static createStrictLimiter(
    maxRequests: number = 5,
    windowMs: number = 15 * 60 * 1000
  ) {
    return rateLimit({
      windowMs,
      max: maxRequests,
      message: {
        error: 'Too many requests from this IP, please try again later.',
        success: false,
        data: {},
        message: 'Rate limit exceeded',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
  }

  static createRouteSpecificLimiter(maxRequests: number, windowMs: number) {
    return rateLimit({
      windowMs,
      max: maxRequests,
      message: {
        error: 'Too many requests for this endpoint, please try again later.',
        success: false,
        data: {},
        message: 'Rate limit exceeded',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
  }
}

export default Security;
