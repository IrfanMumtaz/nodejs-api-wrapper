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
- **Sutando ORM**: Database integration with Sutando ORM for efficient data management

## Project Structure

```
├── src/
│   ├── controller/          # Controller classes
│   ├── model/               # Data models
│   ├── exceptions/          # Custom exception classes
│   ├── requests/            # Request validation
│   └── resources/           # Response formatting
├── routes/                  # API route definitions
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

### Models
Models represent data structures and database entities. They define the structure of your application's data.

```javascript
const { Model } = require('sutando');

class User extends Model {
}

module.exports = User
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

### Sutando ORM Setup
The wrapper uses Sutando ORM for database operations. Configure your database connection in the `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
DB_PORT=3306
```

### Database Configuration
Sutando ORM requires the following environment variables:

- `DB_CONNECTION`: Database driver (mysql2, pg, sqlite3)
- `DB_HOST`: Database host address
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_DATABASE`: Database name
- `DB_PORT`: Database port number

### Migrations
Database migrations help manage schema changes. Sutando provides a powerful migration system for version control of your database schema.

#### Migration Commands
```bash
# Generate a new migration
npx sutando migrate:make create_users_table

# Run all pending migrations
npx sutando migrate:run

# Check migration status
npx sutando migrate:status

# Rollback the last batch of migrations
npx sutando migrate:rollback

# Rollback a specific number of migrations
npx sutando migrate:rollback --step=5
```

#### Migration Structure
Each migration file contains `up` and `down` methods:

```javascript
const { Migration } = require('sutando');

module.exports = class extends Migration {
  async up(schema) {
    await schema.createTable('users', (table) => {
      table.increments('id');
      table.string('name');
      table.string('email').unique();
      table.timestamps();
    });
  }

  async down(schema) {
    await schema.dropTableIfExists('users');
  }
};
```

For more detailed information about migrations, visit the [Sutando Migrations Guide](https://sutando.org/guide/migrations.html).

## Environment Configuration

Environment variables are managed through the `.env` file:

```env
PORT=3000
NODE_ENV=development

# Database Configuration (Sutando ORM)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
DB_PORT=3306
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
// src/controller/UserController.js
const Controller = require('@controllers/Controller');

class UserController extends Controller {
  async getUsers(req, res) {
    // Implementation
  }
}
```

2. **Add routes:**
```javascript
// routes/api.js
const UserController = require('@controller/UserController');
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
- **Sutando ORM**: Database ORM for efficient data management
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