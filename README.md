# E-Commerce API Project

## Description
This is a full-featured e-commerce API built using Node.js, Express, and MongoDB with Mongoose. The API provides functionality for product management, user authentication, order processing, payment handling, and more. This project is designed to be scalable and secure, implementing best practices such as authentication, authorization, and data validation.

## Features
- **User Authentication & Authorization**: Secure login and registration system using JWT (JSON Web Tokens) for session management. Role-based access control is implemented for both users and admins.
- **Categories Management (CRUD)**: Manage product categories with Create, Read, Update, and Delete operations.
- **Subcategories & Brands Management**:Manage subcategories and brands using CRUD operations. Supports hierarchical category systems, including the ability to manage categories and their associated subcategories.
- **Product Management (CRUD)**:Full product management with image uploads (single and multiple) and image processing (resizing, optimization) using Sharp.
- **Shopping Cart & Wishlist**:Allow users to add products to their cart, manage the cart, and store items in their wishlist for future purchases.
- **Coupons & Discounts**: Implement coupon codes to provide users with discounts.
- **Order Processing**: Manage orders, including both cash and online payments
- **Payment Integration with Stripe**:  Enable users to make secure payments using the Stripe API for handling credit card transactions.
- **User Reviews & Ratings**:  Users can leave reviews and rate products they've purchased
- **Shipping & Address Management**: Users can manage their addresses for shipping and place orders to their saved addresses.
- **Advanced Error Handling & Validation**: Comprehensive error handling and validation for all API requests.

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
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **express-validator**: Middleware for validating and sanitizing incoming requests.
- **morgan**: HTTP request logger for development.
- **slugify**: Library for generating slugs based on product titles.
- **Image Processing**: Multer and Sharp (for image resizing).
- **Payment Integration**: Stripe API.
- **Deployment**: Deployed on Vercel.

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
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/your-db-name
   JWT_SECRET=yourjwtsecret
   JWT_EXPIRES_IN=30d
   STRIPE_SECRET_KEY=yourstripekey
   JWT_SECRET=your_jwt_secret
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
