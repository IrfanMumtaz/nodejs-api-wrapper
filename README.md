# Node.js API Wrapper

A comprehensive Node.js API wrapper with centralized exception handling, middleware management, and structured architecture for building scalable REST APIs.

## Author

**Irfan Mumtaz** - Full Stack Developer

- **GitHub**: [@irfan](https://github.com/irfanmumtaz)
- **LinkedIn**: [Irfan](https://www.linkedin.com/in/imirfanmumtaz)
- **Email**: im.irfanmumtaz21@gmail.com

This project is designed to provide a robust foundation for building REST APIs with Node.js and Express.js, featuring centralized exception handling, middleware architecture, and structured code organization.

## Features

- **Centralized Exception Handling**: Global error handling with standardized response format
- **Middleware Architecture**: Modular middleware system for request processing
- **Structured Architecture**: Organized folder structure with controllers, services, models, and business logic
- **Environment Configuration**: Environment variable management with dotenv
- **Express.js Framework**: Built on Express.js for robust API development
- **Prisma ORM**: Database integration with Prisma ORM for type-safe and efficient data management

## Project Structure

```
├── src/
│   ├── controllers/         # Controller classes
│   ├── services/            # Service layer for database operations
│   ├── exceptions/          # Custom exception classes
│   ├── requests/            # Request validation
│   └── resources/           # Response formatting
├── prisma/
│   ├── schema.prisma        # Database schema definition
│   └── migrations/          # Database migrations
├── routes/                  # API route definitions
├── config/                  # Configuration files
├── index.js                 # Application entry point
├── package.json             # Dependencies and scripts
└── .env                     # Environment variables
```

## Installation

1. Clone the repository:
```bash
git clone git@github.com:IrfanMumtaz/nodejs-api-wrapper.git
cd nodejs-api-wrapper
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server:
```bash
npm start
```

## Architecture Overview

### Controllers
Controllers handle HTTP requests and responses. They extend the base `Controller` class and contain route-specific logic.

```javascript
const Controller = require('@controllers/Controller');

class HomeController extends Controller {
  getSampleResponse(req, res) {
    // Handle request logic
  }
}
```

### Services
Services handle database operations and business logic. They provide a clean interface for data access.

```javascript
const prisma = require('@config/db');

class UserService {
  static async getAll() {
    return await prisma.user.findMany();
  }
  
  static async create(userData) {
    return await prisma.user.create({ data: userData });
  }
}

module.exports = UserService;
```

## Exception Handling

The wrapper implements centralized exception handling with a standardized response format:

```javascript
{
  "data": {},
  "error": {},
  "success": false,
  "message": "Error message"
}
```

### Custom Exceptions
Create custom exceptions by extending the base Error class:

```javascript
const BaseException = require(`@exceptions/BaseException`);

class RouteException extends BaseException {

    constructor(message = 'Route Exception', code = 400) {
        super(message, code, 400);
    }

    static badRoute(msg = null) {
        return new RouteException(msg || "Bad request, route does not exist")
    }
}

module.exports = RouteException; 
```

### Request Validation
Create custom request validation class in requests folder using joi:

```javascript
const Joi = require('joi');

const UserRequest = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports = UserRequest
```


### Resource Structuring
Create custom Resource class for the structuring the response data in a unified way:

```javascript
const BaseResource = require(`@resources/BaseResource`);

class HomeResource extends BaseResource{

    
    static setData(data) {
        return {
            "id": data.id,
            "name": data.name,
        }
    }
}

module.exports = HomeResource
```

## API Routes

Routes are defined in the `routes/` directory and follow RESTful conventions:

```javascript
const express = require('express');
const router = express.Router();

router.get('/sample', (req, res) => {
  // Route handler
});

module.exports = router;
```

## Middleware

The wrapper supports custom middleware for request processing, authentication, validation, and more.

### Global Middleware
Middleware can be applied globally in `index.js`:

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### Route-specific Middleware
Apply middleware to specific routes:

```javascript
router.use('/protected', authMiddleware);
```

## Database Integration

### Prisma ORM Setup
The wrapper uses Prisma ORM for database operations. Configure your database connection in the `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

### Database Configuration
Prisma ORM uses a single `DATABASE_URL` environment variable that supports multiple database providers:

- **PostgreSQL**: `postgresql://username:password@localhost:5432/database_name?schema=public`
- **MySQL**: `mysql://username:password@localhost:3306/database_name`
- **SQLite**: `file:./dev.db`

### Schema Definition
Database schema is defined in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}
```

### Database Commands
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Run migrations (production)
npm run db:migrate

# Deploy migrations
npm run db:deploy

# Open Prisma Studio
npm run db:studio
```

For more detailed information, visit the [Prisma Documentation](https://www.prisma.io/docs/).

## Environment Configuration

Environment variables are managed through the `.env` file:

```env
PORT=3000
NODE_ENV=development

# Database Configuration (Prisma ORM)
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

## API Documentation

### Standard Response Format
All API responses follow a consistent format:

**Success Response:**
```json
{
  "data": {},
  "error": {},
  "success": true,
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "data": {},
  "error": {
    "name": "ErrorName",
    "stack": "Error stack trace"
  },
  "success": false,
  "message": "Error message"
}
```

## Getting Started

1. **Create a new controller:**
```javascript
// src/controllers/UserController.js
const Controller = require('@controllers/Controller');
const UserService = require('@services/UserService');

class UserController extends Controller {
  async getUsers(req, res) {
    const users = await UserService.getAll();
    return this.response(res, new UserResource(users));
  }
}
```

2. **Add routes:**
```javascript
// routes/api.js
const UserController = require('@controllers/UserController');
const userController = new UserController();

router.get('/users', (req, res) => userController.getUsers(req, res));
```

3. **Create custom exceptions:**
```javascript
// src/exceptions/ValidationException.js
class ValidationException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationException';
    this.status = 400;
  }
}
```

## Development

### Running in Development
```bash
npm run dev
```

### Running in Production
```bash
npm run start
```


## Dependencies

- **Express.js**: Web framework
- **dotenv**: Environment variable management
- **Prisma ORM**: Type-safe database ORM for efficient data management
- **Additional packages**: Add as needed for your specific use case

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Why MIT License?

The MIT License is one of the most popular open-source licenses because it:

- **Permissive**: Allows commercial use, modification, distribution, and private use
- **Simple**: Easy to understand and implement
- **Compatible**: Works well with other licenses
- **Developer-friendly**: Minimal restrictions while providing liability protection
- **Widely accepted**: Used by major projects like React, Vue.js, and Node.js

### License Summary

- ✅ **Commercial use**: Allowed
- ✅ **Modification**: Allowed  
- ✅ **Distribution**: Allowed
- ✅ **Private use**: Allowed
- ✅ **Patent use**: Allowed
- ❌ **Liability**: Limited
- ❌ **Warranty**: None

For more information about the MIT License, visit [choosealicense.com](https://choosealicense.com/licenses/mit/).

## Support

For questions and support, please open an issue in the GitHub repository.