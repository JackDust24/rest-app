### REST APP for User Profile

# Commerce Service - RESTful API

## Overview

This project implements a RESTful API for a commerce service that manages user accounts, profiles, and authentication. The API is designed to interact with frontend applications and does not require database integration.

## IMPORTANT NOTE

This project does not contain state or a database, so mock data is used. Please look at **Request & Response Examples** for how to use API calls re the mock data.

## File Structure

```bash
src/
├── controllers/
│   ├── profileController.ts // Handles the API requests and responses
├── data/
│   ├── mockUsers.ts // the mock data which is used for returning a response as no data stored
├── middleware/
│   └── authMiddleware.ts // For verifying the auth token
│   └── validateRequest.ts // The validateRequest function is a reusable middleware that leverages dependency injection to validate incoming request bodies against a given Joi schema, ensuring data integrity before passing the request to the next handler.
├── repositories/
│   ├── profileRepository.ts // Handles data access, in this context to the mockUsers data.
├── routes/
│   ├── profileRoutes.ts // Handles API Endpoint routing.
├── services/
│   ├── profileService.ts // Business logic for the API calls
├── utils/
│   └── asyncCatch.ts // A HOC that wraps an asynch route handler to catch any errors and passes them to the next middleware
│   └── helpers.ts // Helper functions
│   └── types.ts // Types used for this project
├── validators/
│   └── passwordValidation.ts // Validator for passwords
│   └── profileValidation.ts // Schema validators for creating and updating profile and changing password.
└── index.ts
```

## Features

The API supports the following functionalities:

### 1. Registration

- Allows new users to register.
- **Fields:** `email`, `password`, `name`, `dob`, `gender`, `address`, `isSubscribed`.

### 2. Profile

- Retrieves user profile information.
- **Fields displayed:** `email`, `name`, `age`, `gender`, `address`, `isSubscribed`.

### 3. Edit Profile

- Allows users to update certain details.
- **Fields allowed to edit:** `dob`, `gender`, `address`, `isSubscribed`.

### 4. Delete Account

- Users can delete their accounts in compliance with PDPA policies.

### 5. Change Password

- Allows users to change their password by providing the current password, new password, and confirmation password.

## Authentication

- Authentication is verified via the HTTP `Authorization` header.
- **Example:** `Authorization: Bearer faketoken_user1`
- A mock authentication system is used (no actual database).

## API Endpoints

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/api/register`        | Register a new user  |
| GET    | `/api/profile`         | Get user profile     |
| PUT    | `/api/edit-profile`    | Update user profile  |
| DELETE | `/api/edit-profile`    | Delete user account  |
| PUT    | `/api/change-password` | Change user password |

## Request & Response Examples

### 1. Register a New User

#### Request:

```json
POST /register
{
  "email": "user@example.com",
  "password": "SecurePass123!!!",
  "name": "Jack Bower",
  "dob": "1990-01-01",
  "gender": "Male",
  "address": "123 Main St, City",
  "isSubscribed": true
}
```

#### Response:

```json
{
  "message": "User created successfully",
}
```

### 2. Get User Profile

#### Request:

Note - Any ID will do

```http
GET /profile/:id
Authorization: Bearer faketoken_user1
```

#### Response:

```json
{
  "email": "user@example.com",
  "name": "John Snow",
  "age": 34,
  "gender": "Male",
  "address": "123 Bangkok St, City",
  "isSubscribed": true
}
```

### 3. Update User Profile

#### Request:

Note - Any ID will do

Note - only dob, gender, address and isSubscribed values allowed.
gender = Either "Male", "Female" or Other
isSubscribed - true or false
address = text value
dob = Must be Date of Birth format.

If above is incorrect, validation will fail. Please check **src/validators/profileValidation.ts** for validation errors.

```http
PUT /edit-profile/:id
Authorization: Bearer faketoken_user1

Example body:
body: {
    "gender": "other",
}
```

#### Response:

```json
{
  "message": "User updated their profile successfully",
}
```


### 4. Delete User Profile

#### Request:

Note - Any ID will do

```http
DELETE /edit-profile/:id
Authorization: Bearer faketoken_user1

```

#### Response:

```json
{
  "message": "User deleted their profile successfully",
}
```

### 5. Change Password

#### Request:

Note - Any ID will do
IMPORTANT NOTE - As using mock data Old Password MUST be as listed below (password123)


```http
POST /change-password/:id
Authorization: Bearer faketoken_user1

body: {
    "oldPassword": "password123",
    "newPassword": "Password1ddddss!" // Must contain at least 8 characters, a capital letter, number and symbol
}
```

#### Response:

```json
{
  "message": "Password changed successfully",
}
```

## Validation

- Ensures correct data types and required fields.

## Running the API

### Prerequisites

- Node.js installed
- `npm install`

### Start Server

```sh
npm run dev
```

### Testing with Postman / curl

Example:

```sh
curl -X GET http://localhost:3000/api/profile/12345 -H "Authorization: Bearer faketoken_user1"
```

## Notes

- This project does not connect to a real database.
- Authentication is mock-based.

## License

MIT License

