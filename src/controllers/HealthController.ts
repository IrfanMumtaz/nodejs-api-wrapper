import { sutando } from 'sutando';
import {
  ExpressRequest,
  ExpressResponse,
  LivenessStatus,
  MemoryUsage,
  ReadinessStatus,
} from '../types';
import Controller from './Controller';

class HealthController extends Controller {
  async healthCheck(req: ExpressRequest, res: ExpressResponse): Promise<void> {
    return this.handleAsync(
      req,
      res,
      async (req: ExpressRequest, res: ExpressResponse) => {
        const health = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          environment: process.env.NODE_ENV || 'development',
          version: process.env.npm_package_version || '1.0.0',
          checks: {
            database: 'healthy',
            memory: this.getMemoryUsage(),
            cpu: process.cpuUsage(),
          },
        };

        // Check database connection
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (sutando as any).raw('SELECT 1');
          health.checks.database = 'healthy';
        } catch (error) {
          health.checks.database = 'unhealthy';
          health.status = 'unhealthy';
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (health as any).error = (error as Error).message;
        }

        const statusCode = health.status === 'healthy' ? 200 : 503;
        return this.response(
          res,
          health,
          statusCode,
          `Service is ${health.status}`
        );
      }
    );
  }

  async readinessCheck(
    req: ExpressRequest,
    res: ExpressResponse
  ): Promise<void> {
    return this.handleAsync(
      req,
      res,
      async (req: ExpressRequest, res: ExpressResponse) => {
        const readiness: ReadinessStatus = {
          status: 'ready',
          timestamp: new Date().toISOString(),
          checks: {
            database: 'ready',
            application: 'ready',
          },
        };

        // Check if application is ready to receive traffic
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (sutando as any).raw('SELECT 1');
          readiness.checks.database = 'ready';
        } catch (error) {
          readiness.checks.database = 'not_ready';
          readiness.status = 'not_ready';
          readiness.error = (error as Error).message;
        }

        const statusCode = readiness.status === 'ready' ? 200 : 503;
        return this.response(
          res,
          readiness as unknown as Record<string, unknown>,
          statusCode,
          `Service is ${readiness.status}`
        );
      }
    );
  }

  async livenessCheck(
    req: ExpressRequest,
    res: ExpressResponse
  ): Promise<void> {
    return this.handleAsync(
      req,
      res,
      async (req: ExpressRequest, res: ExpressResponse) => {
        const liveness: LivenessStatus = {
          status: 'alive',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          memory: this.getMemoryUsage(),
        };

        return this.response(
          res,
          liveness as unknown as Record<string, unknown>,
          200,
          'Service is alive'
        );
      }
    );
  }

  private getMemoryUsage(): MemoryUsage {
    const usage = process.memoryUsage();
    return {
      rss: Math.round((usage.rss / 1024 / 1024) * 100) / 100, // MB
      heapTotal: Math.round((usage.heapTotal / 1024 / 1024) * 100) / 100, // MB
      heapUsed: Math.round((usage.heapUsed / 1024 / 1024) * 100) / 100, // MB
      external: Math.round((usage.external / 1024 / 1024) * 100) / 100, // MB
    };
  }
}

export default HealthController;
