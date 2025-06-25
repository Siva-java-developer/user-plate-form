# User Auth API

A Node.js REST API with user authentication using JWT, built with Express.js and MongoDB.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Input validation with express-validator
- MongoDB with Mongoose ODM
- Proper error handling
- Role-based access control
- Profile management
- Password change functionality

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Environment Variables:** dotenv

## Project Structure

```
user-auth-api/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── userController.js    # User-related business logic
├── middlewares/
│   ├── auth.js             # Authentication middleware
│   ├── errorHandler.js     # Error handling middleware
│   └── validation.js       # Input validation rules
├── models/
│   └── User.js             # User model schema
├── routes/
│   └── userRoutes.js       # User routes
├── utils/
│   ├── jwt.js              # JWT utility functions
│   └── responseHandler.js  # Response formatting utility
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── README.md
└── server.js               # Main application file
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-auth-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables with your values

4. Make sure MongoDB is running on your system

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/user-auth-api
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
```

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/users/register`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Password123"
  }
  ```

#### Login User
- **POST** `/api/users/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "Password123"
  }
  ```

### Profile Management (Protected Routes)

#### Get Profile
- **GET** `/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`

#### Update Profile
- **PUT** `/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com"
  }
  ```

#### Change Password
- **PUT** `/api/users/change-password`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "currentPassword": "Password123",
    "newPassword": "NewPassword123",
    "confirmPassword": "NewPassword123"
  }
  ```

#### Delete Account
- **DELETE** `/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`

### Admin Routes

#### Get All Users (Admin Only)
- **GET** `/api/users`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Query Parameters:** `page`, `limit`

## Password Requirements

- Minimum 6 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Rate limiting ready (can be implemented)
- CORS enabled
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.