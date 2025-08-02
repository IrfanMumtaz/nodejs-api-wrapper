# Contributing Guide

Thank you for your interest in contributing to the Node.js API Wrapper! This guide will help you get started with development and understand our contribution process.

## 🚀 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Database (MySQL, PostgreSQL, or SQLite)
- RabbitMQ (optional, for message queue features)

### Initial Setup

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/nodejs-api-wrapper.git
   cd nodejs-api-wrapper
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Install Git hooks (automatically done by npm install):**

   ```bash
   npm run prepare
   ```

5. **Verify Husky hooks are installed:**

   ```bash
   ls -la .git/hooks/
   ```

   You should see `pre-commit` and `commit-msg` files.

6. **Build the project:**

   ```bash
   npm run build
   ```

## 🔧 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
# or
git checkout -b docs/your-documentation-update
```

### 2. Make Your Changes

Follow the project's architecture patterns:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Models**: Define database models
- **Resources**: Transform data for API responses
- **Requests**: Validate incoming data
- **Exceptions**: Handle errors consistently
- **Middlewares**: Add request processing logic

### 3. Run Quality Checks

```bash
# Run all quality checks
npm run quality

# Fix quality issues automatically
npm run quality:fix
```

### 4. Test Your Changes

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests in parallel (recommended)
npm run test:parallel

# Run tests with coverage
npm run test:coverage
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 🧪 Testing Guidelines

### Test Structure

The project uses Jest with advanced parallel testing capabilities:

```
tests/
├── controllers/          # Controller tests
├── services/            # Service tests
├── middlewares/         # Middleware tests
├── utils/               # Test utilities
├── setup.ts             # Test setup
├── globalSetup.ts       # Global test setup
├── globalTeardown.ts    # Global test teardown
└── testSequencer.ts     # Custom test sequencer
```

### Writing Tests

1. **Test File Naming**: Use `.test.ts` or `.spec.ts` suffix
2. **Test Organization**: Group related tests using `describe` blocks
3. **Test Isolation**: Each test should be independent
4. **Performance**: Use parallel test utilities for better performance

### Example Test

```typescript
import { ParallelTestUtils } from '../utils/parallelTestUtils';

describe('UserService', () => {
  let testId: string;

  beforeEach(() => {
    testId = ParallelTestUtils.generateTestId('user-service');
    ParallelTestUtils.startTestTimer(testId);
  });

  afterEach(() => {
    const executionTime = ParallelTestUtils.endTestTimer(testId);
    ParallelTestUtils.cleanupTestDataDir(testId);
  });

  it('should create a new user', async () => {
    // Test implementation
  });
});
```

### Test Commands

```bash
# Run specific test file
npm test -- tests/controllers/HomeController.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="user"

# Run tests with verbose output
npm test -- --verbose

# Run tests with coverage for specific file
npm run test:coverage -- tests/controllers/HomeController.test.ts
```

## 📝 Code Quality Standards

### Linting and Formatting

The project uses ESLint and Prettier for code quality:

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

### TypeScript

Strict TypeScript configuration is enforced:

```bash
# Type checking
npm run type-check

# Build with type checking
npm run build
```

### Quality Commands

```bash
# Run all quality checks
npm run quality

# Fix all quality issues
npm run quality:fix

# Run lint-staged (for pre-commit)
npm run lint:staged
```

## 🔒 Git Hooks

This project uses Husky to manage Git hooks for code quality and commit message validation.

### Pre-commit Hook

The pre-commit hook runs automatically before each commit and performs:

- **Type checking**: `npm run type-check`
- **Linting**: `npm run lint`
- **Tests**: `npm run test`

If any of these checks fail, the commit will be aborted.

### Commit Message Hook

The commit-msg hook validates commit messages using commitlint and the conventional commits specification.

#### Valid Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Supported Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test changes
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Revert previous commit

#### Examples

✅ **Valid commit messages:**

```
feat: add user authentication
fix(auth): resolve login issue
docs: update API documentation
style: format code with prettier
refactor(api): improve error handling
test: add unit tests for user service
perf: optimize database queries
build: update dependencies
ci: add GitHub Actions workflow
chore: update README
```

❌ **Invalid commit messages:**

```
add new feature
fixed bug
update docs
```

## 🏗️ Project Architecture

### Directory Structure

Follow the established project structure:

```
src/
├── controllers/       # HTTP request handlers
├── services/         # Business logic
├── models/           # Database models
├── resources/        # API response transformers
├── requests/         # Request validation schemas
├── exceptions/       # Custom exception classes
├── middlewares/      # Express middlewares
├── container/        # Dependency injection
└── types/           # TypeScript type definitions
```

### Coding Patterns

1. **Controllers**: Handle HTTP requests, delegate to services
2. **Services**: Implement business logic, interact with models
3. **Models**: Define database structure and relationships
4. **Resources**: Transform data for API responses
5. **Requests**: Validate and sanitize incoming data
6. **Exceptions**: Provide consistent error handling
7. **Middlewares**: Add cross-cutting concerns

### Example Implementation

```typescript
// Controller
export class UserController extends Controller {
  constructor(private userService: UserService) {
    super();
  }

  async create(req: Request, res: Response): Promise<void> {
    const userData = await UserRequest.validate(req.body);
    const user = await this.userService.create(userData);
    res.json(new UserResource(user));
  }
}

// Service
export class UserService extends BaseService {
  async create(data: CreateUserData): Promise<User> {
    // Business logic implementation
  }
}

// Resource
export class UserResource extends BaseResource {
  constructor(user: User) {
    super({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    });
  }
}
```

## 🔧 Troubleshooting

### Git Hooks Not Working

If Git hooks are not working:

1. **Reinstall Husky:**

   ```bash
   npm run prepare
   ```

2. **Manually copy hooks:**

   ```bash
   cp .husky/pre-commit .git/hooks/
   cp .husky/commit-msg .git/hooks/
   chmod +x .git/hooks/pre-commit .git/hooks/commit-msg
   ```

3. **Verify hooks are executable:**
   ```bash
   ls -la .git/hooks/pre-commit .git/hooks/commit-msg
   ```

### Commit Message Validation Failing

If commit message validation fails:

1. **Check the error message** - it will tell you what's wrong
2. **Use conventional commit format** (see examples above)
3. **Test your commit message:**
   ```bash
   echo "your commit message" | npx commitlint
   ```

### Quality Checks Failing

If quality checks fail:

1. **Run quality fix:**

   ```bash
   npm run quality:fix
   ```

2. **Fix remaining issues manually**

3. **Re-run quality checks:**
   ```bash
   npm run quality
   ```

### Test Failures

If tests are failing:

1. **Check test environment:**
   ```bash
   npm run test:coverage
   ```

2. **Run tests in isolation:**
   ```bash
   npm test -- --testNamePattern="specific test name"
   ```

3. **Check for test data conflicts:**
   ```bash
   npm run test:parallel:fast
   ```

## 🎯 Pull Request Guidelines

### Before Submitting

1. **Ensure all tests pass:**
   ```bash
   npm run test:parallel
   ```

2. **Run quality checks:**
   ```bash
   npm run quality
   ```

3. **Update documentation** if needed

4. **Add tests** for new features

### Pull Request Template

Use this template for your pull requests:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement
- [ ] Test addition/update

## Testing
- [ ] All tests pass
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements left
- [ ] No TODO comments left
```

## 📚 Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Jest Testing Framework](https://jestjs.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

## 🤝 Getting Help

If you need help with development:

1. **Check existing issues** on GitHub
2. **Search documentation** in the README
3. **Create an issue** for bugs or feature requests
4. **Join discussions** in pull requests

Thank you for contributing to the Node.js API Wrapper! 🎉
