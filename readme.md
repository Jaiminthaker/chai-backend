# Chai Backend

A backend API built with Node.js, Express, and MongoDB for user authentication and session management. This project is part of the Chai and Code learning series and focuses on real-world backend patterns like JWT auth, password hashing, cookie-based sessions, and structured API responses.

## Overview

This application provides the core user authentication flow for a web application:

- User registration
- User login using username or email
- JWT access token and refresh token generation
- Cookie-based token storage for authenticated requests
- User logout and token invalidation
- Refresh token rotation for secure session renewal
- MongoDB integration with Mongoose models
- Standardized API response and error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Cookie Parser
- CORS
- dotenv for environment configuration

## Project Structure

```bash
chai-backend/
├── src/
│   ├── app.js
│   ├── index.js
│   ├── constants.js
│   ├── controller/
│   │   └── user.controller.js
│   ├── db/
│   ├── middlewares/
│   │   └── auth.middlewares.js
│   ├── models/
│   │   ├── subscription.models.js
│   │   ├── user.models.js
│   │   └── video.models.js
│   ├── routes/
│   │   └── user.routes.js
│   └── utils/
│       ├── apiError.js
│       ├── apiResponse.js
│       ├── asyncHandler.js
│       └── fileUploading.js
├── public/
├── package.json
├── readme.md
└── .env
```

## Features Implemented

### Authentication Flow

- Validates required signup fields: fullName, userName, email, password
- Prevents duplicate users by username or email
- Hashes passwords before saving using bcrypt
- Generates access token and refresh token on login
- Stores refresh token in the database and cookies
- Verifies access tokens via middleware before protected routes
- Clears cookies on logout and removes refresh token from the user record
- Refreshes access tokens using the valid refresh token

### API Response Pattern

The project uses a consistent response structure through helper utilities:

```js
{
  statusCode: 200,
  message: "Success",
  data: {...}
}
```

Errors are also centralized through a custom `ApiError` class.

## Prerequisites

Before running this project, make sure you have:

- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string
- A .env file configured

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:

```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRATION=1d
REFRESH_TOKEN_EXPIRATION=10d
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

The server will run on the port defined in `PORT` (default: 8000).

## Available Routes

### User Routes

Base path: `/api/v1/user`

#### 1) Register User

- Method: `POST`
- Route: `/api/v1/user/register`
- Body:

```json
{
  "fullName": "John Doe",
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "12345678"
}
```

#### 2) Login User

- Method: `POST`
- Route: `/api/v1/user/login`
- Body:

```json
{
  "userName": "johndoe",
  "password": "12345678"
}
```

You can also login with `email` instead of `userName`.

#### 3) Logout User

- Method: `POST`
- Route: `/api/v1/user/logout`
- Requires authentication
- Works with either the cookie-based access token or Authorization header token

#### 4) Refresh Access Token

- Method: `POST`
- Route: `/api/v1/user/refresh-token`
- Accepts either a refresh token from cookie or request body

## Middleware

The app uses `verifyJWT` middleware to protect authenticated routes. It reads the access token from cookies or the `Authorization` header and verifies it using the access token secret.

## Notes

- The project currently focuses on user authentication and session management.
- Supporting models for videos and subscriptions are present in the codebase, which indicates future extension for a video/content platform.
- Some authentication helper functions exist in the controller, but the routes for those are not yet exposed in the main router.

## License

This project is licensed under ISC.

## Author

Jaimin Thakar