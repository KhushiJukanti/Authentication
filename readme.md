# Authentication Project.

## Purpose

This project provides a simple authentication API using Express.js, MongoDB, and JWT tokens. It allows users to sign up, log in, and access their user details securely using JWT tokens.

## Installation BACKEND

#### 1. Install backend tools:

- Make sure you have Node.js and npm installed on your system.
- Install MongoDB if you haven't already. You can download it from Google.

#### 2. Install dependencies:
``` bash 
npm init express cors jsonwebtoken mongoose nodemon
```

#### 3. Connect MongoDB to the Server:

- Ensure MongoDB is installed and running on your system. If not, you can download and install it from the official MongoDB website.
- In the server file (`server.js`), specify the connection URI for MongoDB. Replace `<your_mongodb_connection_uri>` with the actual connection URI of your MongoDB database.
- Create one `.env` file for secrete keys.

```bash
.env
MONGO_URI = your_mongo_uri
JWT_SECRET = your_secret_key here
```

#### 4. Run the server:

```bash
npm start
```

## Installation FRONTENT

- Display Signup: Display signup page.

- navigate to login page: after completed signup it will navigate tp login page.

- User Details: after successfully login it will navigate user details page get the details of who logged in tha page.
```bash
npx create-react-app 
npm install
```

## API Endpoints

### Authentication
- Signup: `POST /auth/signup`
    - Creates a new user account. Requires `fullName`, `email`, `password`, and `repassword` in the request body.
- Login: `POST /auth/login`
    - Authenticates a user. Requires `email` and `password` in the request body. Returns a JWT token upon successful authentication.
- User Details: `GET /auth/user-details`
    - Retrieves details of all users. Protected route, requires a valid JWT token with admin role.

### Middleware

- Authentication Middleware: `authMiddleware`

    - Middleware to verify JWT token and ensure proper authorization for protected routes. for users.

## Dependencies
- express
- jwt
- mongoose

## Models

- Fields:
    - `fullName`: String
    - `email`: String
    - `password`: String
    - `repassword`: String
    

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.



