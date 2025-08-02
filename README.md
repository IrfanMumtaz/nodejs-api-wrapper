# Node.js API Wrapper

A comprehensive Node.js API wrapper with centralized exception handling, middleware management, and structured architecture for building scalable REST APIs.

## 🚀 Features

- 🏗️ **Structured Architecture**: Clean separation of concerns with controllers, services, models, and resources
- 🛡️ **Exception Handling**: Centralized error handling with custom exception classes and error registry
- 🔧 **Middleware Management**: Built-in middleware for logging, validation, sanitization, correlation, and timeout
- 🧪 **Advanced Testing**: Comprehensive testing setup with Jest, parallel execution, and performance monitoring
- 📊 **Database Support**: Multiple database support with Sutando ORM (MySQL, PostgreSQL, SQLite)
- 🔄 **Message Queues**: RabbitMQ integration for background processing
- ⏰ **Cron Jobs**: Scheduled task management with node-cron
- 🎯 **TypeScript**: Full TypeScript support with strict type checking and path aliases
- 🔒 **Security**: Built-in security middleware with Helmet, CORS, rate limiting, and compression
- 📝 **Logging**: Structured logging with Winston and daily rotation
- 🏃‍♂️ **Performance**: Parallel test execution, caching, and performance monitoring
- 🎨 **Code Quality**: ESLint, Prettier, Husky hooks, and conventional commits

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Database (MySQL, PostgreSQL, or SQLite)
- RabbitMQ (optional, for message queues)

## 🛠️ Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/irfan/nodejs-api-wrapper.git
cd nodejs-api-wrapper

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Build the project
npm run build

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration:

```env
# Application Configuration
NODE_ENV=development
APP_PORT=3000
APP_ENV=development

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=test
PGSSL=false

# Security Configuration
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRES_IN=24h

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Compression
COMPRESSION_LEVEL=6
COMPRESSION_THRESHOLD=1024

# CORS
CORS_ORIGIN=*

# Request Timeout
REQUEST_TIMEOUT=30000

# Database Pooling
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_POOL_ACQUIRE_TIMEOUT=30000
DB_POOL_CREATE_TIMEOUT=30000
DB_POOL_DESTROY_TIMEOUT=5000
DB_POOL_IDLE_TIMEOUT=30000
DB_POOL_REAP_INTERVAL=1000
DB_POOL_CREATE_RETRY_INTERVAL=200

# RabbitMQ Configuration (optional)
RABBITMQ_URL=amqp://localhost
```

## 🏗️ Project Structure

```
├── config/                 # Configuration files
│   ├── ConfigValidator.ts  # Environment validation
│   ├── db.ts              # Database configuration
│   ├── Logger.ts          # Logging configuration
│   ├── Rabbitmq.ts        # RabbitMQ configuration
│   └── Security.ts        # Security middleware setup
├── consumers/             # Message queue consumers
│   ├── example.ts         # Example consumer
│   └── index.ts           # Consumer registry
├── cron/                  # Scheduled tasks
│   ├── CronRegistry.ts    # Cron job registry
│   └── SampleCron.ts      # Example cron job
├── migrations/            # Database migrations
│   └── 2025_07_22_112747_create_users_table.ts
├── routes/                # Route definitions
│   ├── api.ts             # API routes
│   ├── RouteRegistry.ts   # Route registry
│   └── web.ts             # Web routes
├── src/
│   ├── container/         # Dependency injection
│   │   ├── Container.ts   # DI container
│   │   └── ServiceRegistry.ts
│   ├── controllers/       # Request handlers
│   │   ├── Controller.ts  # Base controller
│   │   ├── HealthController.ts
│   │   └── HomeController.ts
│   ├── exceptions/        # Custom exception classes
│   │   ├── BaseException.ts
│   │   ├── ErrorRegistry.ts
│   │   ├── ResponseException.ts
│   │   ├── RouteException.ts
│   │   ├── SampleException.ts
│   │   └── ValidationException.ts
│   ├── middlewares/       # Express middlewares
│   │   ├── CorrelationMiddleware.ts
│   │   ├── LoggingMiddleware.ts
│   │   ├── SanitizationMiddleware.ts
│   │   ├── TimeoutMiddleware.ts
│   │   └── ValidationMiddleware.ts
│   ├── models/            # Database models
│   │   └── User.ts
│   ├── requests/          # Request validation schemas
│   │   └── UserRequest.ts
│   ├── resources/         # Response transformers
│   │   ├── BaseResource.ts
│   │   ├── ErrorResource.ts
│   │   ├── HomeResource.ts
│   │   └── SuccessResource.ts
│   ├── services/          # Business logic
│   │   ├── BaseService.ts
│   │   └── UserService.ts
│   └── types/             # TypeScript type definitions
├── tests/                 # Test files
│   ├── controllers/       # Controller tests
│   ├── utils/             # Test utilities
│   ├── globalSetup.ts     # Global test setup
│   ├── globalTeardown.ts  # Global test teardown
│   ├── setup.ts           # Test setup
│   └── testSequencer.ts   # Custom test sequencer
├── index.ts              # Application entry point
├── Registry.ts           # Application registry
└── sutando.config.ts     # ORM configuration
```

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Build the project
npm run build

# Clean build directory and rebuild
npm run build:clean

# Type checking
npm run type-check
```

### Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests in parallel (optimized)
npm run test:parallel

# Run fast parallel tests (skip integration/e2e)
npm run test:parallel:fast

# Run full parallel tests
npm run test:parallel:full

# Run tests with coverage
npm run test:coverage

# Run tests with coverage in watch mode
npm run test:coverage:watch

# Run tests with coverage for CI
npm run test:coverage:ci

# Generate HTML coverage report
npm run test:coverage:html

# Generate JSON coverage report
npm run test:coverage:json

# Run tests with coverage thresholds
npm run test:coverage:threshold

# Open coverage report in browser
npm run test:coverage:open
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Run lint-staged (for pre-commit)
npm run lint:staged

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check

# Run all quality checks
npm run quality

# Fix all quality issues
npm run quality:fix
```

### Production

```bash
# Start production server
npm start

# Start RabbitMQ consumers
npm run rabbitmq
```

## 🧪 Testing Features

### Parallel Test Execution

The project includes advanced parallel testing capabilities:

- **Custom Test Sequencer**: Optimizes test execution order
- **Performance Monitoring**: Tracks test execution times
- **Test Isolation**: Ensures tests don't interfere with each other
- **Global Setup/Teardown**: Manages test environment lifecycle
- **Parallel Utilities**: Helper functions for parallel test execution

### Test Types

- **Unit Tests**: Fast, isolated component tests
- **Controller Tests**: API endpoint testing
- **Service Tests**: Business logic testing
- **Integration Tests**: Database and external service testing
- **E2E Tests**: Full application flow testing

## 🔧 Development Tools

### IDE Configuration

This project includes comprehensive IDE configurations for VS Code:

#### Required Extensions

- TypeScript and JavaScript Language Features
- ESLint
- Prettier - Code formatter
- Jest Runner
- Path Intellisense
- Auto Rename Tag

#### Features

- **Auto-formatting**: Code is automatically formatted on save
- **Linting**: ESLint runs on save to catch errors and enforce code style
- **Debugging**: Pre-configured debug configurations for application and tests
- **Tasks**: Built-in tasks for common operations (build, test, lint)
- **Git Integration**: Husky hooks for pre-commit checks

### Git Hooks

The project uses Husky for Git hooks:

- **Pre-commit**: Runs type checking, linting, and tests
- **Commit-msg**: Validates commit message format (conventional commits)

### Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test changes
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Revert previous commit

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request rate limiting
- **Compression**: Response compression
- **Request Sanitization**: Input sanitization
- **Timeout Protection**: Request timeout middleware
- **Correlation IDs**: Request tracing

## 📊 Database Support

The project supports multiple databases through Sutando ORM:

- **MySQL**: Primary database support
- **PostgreSQL**: Full PostgreSQL support with SSL
- **SQLite**: Lightweight database option

### Migration Commands

```bash
# Run migrations
npx sutando migrate

# Rollback migrations
npx sutando migrate:rollback

# Create new migration
npx sutando make:migration create_table_name
```

## 🔄 Message Queue Integration

RabbitMQ integration for background processing:

```bash
# Start message queue consumers
npm run rabbitmq
```

## ⏰ Cron Jobs

Scheduled task management with node-cron:

```typescript
// Enable cron jobs in index.ts
import '@cron/CronRegistry';
```

## 🤝 Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Irfan Mumtaz**

- Email: im.irfanmumtaz21@gmail.com
- GitHub: [@irfanmumtaz](https://github.com/irfanmumtaz)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [Sutando](https://sutando.org/) - ORM
- [Jest](https://jestjs.io/) - Testing framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Husky](https://typicode.github.io/husky/) - Git hooks
