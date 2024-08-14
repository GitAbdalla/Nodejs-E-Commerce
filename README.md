E-Commerce API
Description
This project is a full-fledged e-commerce API built using Node.js, Express, and MongoDB. It handles user authentication, product management, order processing, and payment integration, ensuring secure and efficient management of the e-commerce backend. The API supports typical e-commerce operations like product browsing, cart management, order processing, and payment handling, designed to scale with real-world applications.

Features
User Authentication: Secure login, registration, and password management using JWT (JSON Web Tokens).
Role-Based Access Control: Admin and user roles with distinct permissions (product management for admin, product browsing, and order placement for users).
Product Management: CRUD (Create, Read, Update, Delete) operations for products.
Cart & Order Management: Users can add items to their cart and place orders.
Payment Handling: Payment gateway integration for processing orders.
Error Handling: Centralized error management for consistent API responses.
Pagination: Efficient handling of large data sets with pagination support.
Validation: Comprehensive request validation to ensure data integrity.
Technologies Used
Backend
Node.js: JavaScript runtime for server-side programming.
Express: Web framework for building RESTful APIs.
MongoDB: NoSQL database for storing product, order, and user data.
Mongoose: ODM (Object Data Modeling) library for MongoDB, providing schema-based data models.
Middleware & Utilities
bcrypt: Library for hashing passwords securely.
cors: Middleware for enabling Cross-Origin Resource Sharing.
dotenv: Module for loading environment variables from a .env file.
helmet: Middleware for enhancing security by setting various HTTP headers.
jsonwebtoken: Library for generating and verifying JWT tokens.
nodemailer: Module for sending email notifications.
slugify: Utility for generating slugs for product URLs.
validator: Middleware for validating incoming requests.
Payment Integration
Stripe: Payment gateway used for processing secure payments.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-repository.git
cd your-repository
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root of your project and add the following variables:

bash
Copy code
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=jwt_expiry_time
STRIPE_SECRET_KEY=your_stripe_secret_key
Start the server:

For development:

bash
Copy code
npm run dev
For production:

bash
Copy code
npm start
