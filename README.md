# Node.js API Wrapper

A comprehensive Node.js API wrapper with centralized exception handling, middleware management, and structured architecture for building scalable REST APIs.

## Features

- 🏗️ **Structured Architecture**: Clean separation of concerns with controllers, services, and models
- 🛡️ **Exception Handling**: Centralized error handling with custom exception classes
- 🔧 **Middleware Management**: Built-in middleware for logging, validation, and security
- 🧪 **Testing**: Comprehensive testing setup with Jest and parallel test execution
- 📊 **Database Support**: Multiple database support with Sutando ORM
- 🔄 **Message Queues**: RabbitMQ integration for background processing
- ⏰ **Cron Jobs**: Scheduled task management
- 🎯 **TypeScript**: Full TypeScript support with strict type checking

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/irfan/nodejs-api-wrapper.git
cd nodejs-api-wrapper

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

## Development Setup

### IDE Configuration

This project includes comprehensive IDE configurations for VS Code:

#### Required Extensions

Install the recommended extensions for VS Code:
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

#### VS Code Settings

The workspace includes optimized settings for:
- TypeScript auto-imports and path resolution
- Editor formatting and code actions
- File exclusions and search patterns
- Terminal configuration for Git Bash

### Code Quality Tools

#### Linting and Formatting

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

#### Type Checking

```bash
# Run TypeScript type checking
npm run type-check
```

#### Quality Checks

```bash
# Run all quality checks
npm run quality

# Fix all quality issues
npm run quality:fix
```

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

## Project Structure

```
├── config/                 # Configuration files
├── consumers/             # Message queue consumers
├── cron/                  # Scheduled tasks
├── migrations/            # Database migrations
├── routes/                # Route definitions
├── src/
│   ├── container/         # Dependency injection container
│   ├── controllers/       # Request handlers
│   ├── exceptions/        # Custom exception classes
│   ├── middlewares/       # Express middlewares
│   ├── models/            # Database models
│   ├── requests/          # Request validation schemas
│   ├── resources/         # Response transformers
│   ├── services/          # Business logic
│   └── types/             # TypeScript type definitions
├── tests/                 # Test files
└── index.ts              # Application entry point
```

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm run build:clean` - Clean build directory and rebuild

### Testing
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:parallel` - Run tests in parallel

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run quality` - Run all quality checks

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password

# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost

# Security
JWT_SECRET=your_jwt_secret
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards
4. Run quality checks (`npm run quality`)
5. Commit your changes with conventional commit format
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Irfan Mumtaz**
- Email: im.irfanmumtaz21@gmail.com
- GitHub: [@irfanmumtaz](https://github.com/irfanmumtaz)
