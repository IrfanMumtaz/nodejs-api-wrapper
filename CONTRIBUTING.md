# Contributing Guide

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Initial Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Install Git hooks (automatically done by npm install):**

   ```bash
   npm run prepare
   ```

3. **Verify Husky hooks are installed:**

   ```bash
   ls -la .git/hooks/
   ```

   You should see `pre-commit` and `commit-msg` files.

## Git Hooks

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
```

❌ **Invalid commit messages:**

```
add new feature
fixed bug
update docs
```

## Code Quality

### Linting and Formatting

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **TypeScript**: Type checking

### Quality Commands

```bash
# Run all quality checks
npm run quality

# Fix all quality issues
npm run quality:fix

# Run linting only
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type checking
npm run type-check
```

### Pre-commit Quality Checks

The pre-commit hook automatically runs:

1. TypeScript type checking
2. ESLint linting
3. Jest tests

If any check fails, the commit is aborted and you must fix the issues before committing.

## Development Workflow

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

3. **Run quality checks:**

   ```bash
   npm run quality
   ```

4. **Stage your changes:**

   ```bash
   git add .
   ```

5. **Commit with conventional commit format:**

   ```bash
   git commit -m "feat: add new feature"
   ```

6. **Push your changes:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

## Troubleshooting

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

## IDE Configuration

This project includes VS Code configurations for optimal development experience:

- **Auto-formatting** on save
- **ESLint integration** with auto-fix
- **TypeScript support** with path resolution
- **Debug configurations** for application and tests
- **Built-in tasks** for common operations

Make sure to install the recommended VS Code extensions when prompted.
