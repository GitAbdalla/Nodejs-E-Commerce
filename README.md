# E-Commerce API Project

## Description
This project is an advanced e-commerce API built using Node.js and Express. It includes features like product management, categories, brands, authentication, authorization, and a built-in payment system. The project is designed to provide a robust backend for an e-commerce platform, ensuring scalability, security, and maintainability.

## Features
- **User Authentication & Authorization**: Secure login and registration system using JWT (JSON Web Tokens) for session management. Role-based access control is implemented for both users and admins.
- **Product Management**: Admins can create, update, delete, and retrieve products. Products are linked to categories, brands, and subcategories.
- **Category and Subcategory Management**: Supports hierarchical category systems, including the ability to manage categories and their associated subcategories.
- **Brands Management**: Ability to manage brands, allowing products to be associated with different brands.
- **Payment Integration**: The API integrates payment functionality, allowing users to make secure payments for their orders.
- **CRUD Operations**: Full CRUD support for products, categories, subcategories, and brands.
- **Validation**: Server-side validation using express-validator to ensure data integrity.
- **Error Handling**: Centralized error handling to manage application-level errors.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing e-commerce data (products, categories, orders, etc.).
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, providing a schema-based solution to model data.

### Middleware & Utilities
- **bcrypt**: Library for hashing passwords securely.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Module for loading environment variables from a `.env` file.
- **helmet**: Middleware for enhancing security by setting various HTTP headers.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **express-validator**: Middleware for validating and sanitizing incoming requests.
- **morgan**: HTTP request logger for development.
- **slugify**: Library for generating slugs based on product titles.

## Development Tools
- **Git**: Version control system for tracking changes and collaborating on the codebase.
- **Visual Studio Code**: Code editor for development.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/GitAbdalla/Nodejs-E-Commerce.git
    cd Nodejs-E-Commerce
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of your project and add the following variables:

    ```
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

4. **Start the server:**

    For development:

    ```bash
    npm run start:dev
    ```

    For production:

    ```bash
    npm run start:prod
    ```
