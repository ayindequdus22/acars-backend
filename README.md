## Car Application API

This Express-based REST API is designed for a car application, providing robust and secure endpoints for user authentication, cart management, and product queries. The API utilizes JSON Web Tokens (JWT) for authentication, bcrypt for secure password hashing, and cookie-parser for handling cookies. Below is an overview of the key features and endpoints of the application.

Authentication
JWT Authentication:

JWT tokens are used to securely authenticate users, ensuring that each request is from a verified user.
Tokens are issued upon successful login and are required for accessing protected routes.
bcrypt:

Passwords are hashed using bcrypt before storing in the database, ensuring that user credentials are securely managed.
cookie-parser:

Cookies are used to store the JWT tokens, making it easier to manage user sessions.
# Technologies Used
Express.js: A fast and minimalist web framework for Node.js.
JWT: For secure user authentication.
bcrypt: For hashing user passwords.
cookie-parser: For parsing cookies attached to client requests.
MongoDB/Mongoose (or another database): For storing user and product data.

# Security Considerations
JWT Secret: Ensure the JWT secret is stored securely and not exposed publicly.
Password Hashing: Use bcrypt to hash passwords before storing them in the database.
HTTPS: Serve the API over HTTPS to secure data in transit.
