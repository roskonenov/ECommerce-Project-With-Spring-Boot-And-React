# 🛒 Spring Boot E-Commerce Platform

A full-featured RESTful e-commerce backend application built with Spring Boot 3.5.6, demonstrating modern enterprise Java development practices and clean architecture principles.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project is a comprehensive e-commerce backend solution that provides REST APIs for managing products, categories, shopping carts, orders, user authentication, and address management. Built with industry-standard practices, it showcases proficiency in Spring ecosystem, security implementation, and scalable application design.

## ✨ Features

### Core Functionality
- 🔐 **JWT Authentication & Authorization** - Secure user authentication with role-based access control
- 👤 **User Management** - Registration, login, and profile management
- 🏪 **Product Management** - CRUD operations for products with image upload support
- 📦 **Category Management** - Organize products into hierarchical categories
- 🛒 **Shopping Cart** - Add, update, and remove items from cart
- 📋 **Order Processing** - Complete order lifecycle management
- 📍 **Address Management** - Multiple shipping addresses per user

### Technical Features
- 📸 **Image Upload Integration** - ImgBB API integration for product images
- 📄 **API Documentation** - Interactive Swagger/OpenAPI documentation
- 🔒 **Spring Security** - Comprehensive security configuration
- ✅ **Data Validation** - Bean validation for request payloads
- 🗄️ **PostgreSQL Database** - Production-ready relational database
- 🎨 **Clean Architecture** - Separation of concerns with layered architecture

## 🛠️ Tech Stack

### Backend
- **Java 17** - Modern Java features and syntax
- **Spring Boot 3.5.6** - Framework for building enterprise applications
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database access and ORM
- **Hibernate** - JPA implementation
- **JWT (jjwt 0.13.0)** - Token-based authentication

### Database
- **PostgreSQL** - Primary production database
- **Hibernate DDL Auto** - Automatic schema generation and updates

### Additional Libraries
- **Lombok** - Reduce boilerplate code
- **ModelMapper 3.2.4** - Object mapping between DTOs and entities
- **SpringDoc OpenAPI 2.8.13** - API documentation
- **Bean Validation** - Request validation

### Tools
- **Maven** - Dependency management and build tool
- **Swagger UI** - Interactive API documentation

## 🏗️ Architecture

The application follows a layered architecture pattern:
```
├── controller/   # REST API endpoints 
├── service/      # Business logic layer 
├── repositories/ # Data access layer 
├── model/        # JPA entities 
├── payload/      # DTOs (Request/Response objects) 
├── security/     # Security configuration & JWT handling 
├── config/       # Application configuration 
├── exceptions/   # Custom exception handling 
├── init/         # Application initialization 
└── util/         # Utility classes
```

### Design Patterns Used
- **Repository Pattern** - Data access abstraction
- **DTO Pattern** - Separate internal models from API contracts
- **Service Layer Pattern** - Business logic encapsulation
- **Dependency Injection** - Loose coupling and testability

## 🚀 Getting Started

### Prerequisites

Before running this application, ensure you have:

- Java 17 or higher installed
- PostgreSQL 12+ installed and running
- Maven 3.6+ installed
- ImgBB API key (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/roskonenov/Spring-Boot-ECommerce-Project-Back-End.git
   cd Spring-Boot-ECommerce-Project-Back-End
   ```

2. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE ecommerce;
   ```

3. **Configure environment variables**

   Create a `.env` file or set environment variables:
   ```bash
   export JWT_SECRET=your_super_secret_jwt_key_here
   export IMGBB_API_KEY=your_imgbb_api_key_here
   ```

4. **Update application.properties** (if needed)

   Configure `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

5. **Build the project**
   ```bash
   mvn clean install
   ```

6. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

### Configuration

#### Database Configuration
The application uses PostgreSQL by default. To switch databases:
- Uncomment MySQL or H2 dependencies in `pom.xml`
- Update `spring.datasource.*` properties accordingly

#### JWT Configuration
- `jwt.secret` - Secret key for JWT signing (set via environment variable)
- `jwt.expiration` - Token expiration time (default: 24 hours)
- `jwt.cookie` - Cookie name for JWT storage

#### File Upload Configuration
- `spring.servlet.multipart.max-file-size` - Maximum file size (default: 32MB)
- `imgbb.api.url` - ImgBB API endpoint
- `imgbb.api.key` - Your ImgBB API key

## 📚 API Documentation

Once the application is running, access the interactive API documentation at:
[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)


### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

#### Products
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

#### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/{id}` - Update category (Admin)
- `DELETE /api/categories/{id}` - Delete category (Admin)

#### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/products/{productId}` - Add product to cart
- `PUT /api/cart/products/{productId}` - Update product quantity
- `DELETE /api/cart/products/{productId}` - Remove product from cart

#### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders/{id}` - Get order details

#### Addresses
- `GET /api/addresses` - Get user's addresses
- `POST /api/addresses` - Add new address
- `PUT /api/addresses/{id}` - Update address
- `DELETE /api/addresses/{id}` - Delete address

## 🔒 Security

### Authentication Flow
1. User registers via `/api/auth/register`
2. User logs in via `/api/auth/login` and receives JWT token in HTTP-only cookie
3. Token is automatically included in subsequent requests via cookie
4. Server validates token and authorizes user access

**Note**: The application also supports token authentication via `Authorization: Bearer {token}` header as a fallback option.

### Authorization
- **Public endpoints**: Registration, login, public product listing
- **User endpoints**: Cart, orders, addresses (requires authentication)
- **Admin endpoints**: Product/category management (requires ADMIN role)

### Security Features
- Password encryption using BCrypt
- JWT token expiration
- CORS configuration
- HTTP-only cookies option
- CSRF protection (configurable)

## 🗄️ Database Schema

The application uses JPA entities with automatic schema generation. Main entities include:

- **User** - User accounts with authentication details
- **Role** - User roles (USER, ADMIN)
- **Product** - Product information with images
- **Category** - Product categories
- **Cart** - Shopping cart
- **CartItem** - Products in cart
- **Order** - Order information
- **OrderItem** - Products in order
- **Address** - User addresses
- **Payment** - Payment information

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Rosen Nenov**

- Portfolio: [My Portfolio](https://my-portfolio-2e76d.web.app/)
- GitHub: [@roskonenov](https://github.com/roskonenov)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/rosen-nenov-2ab7262b6/)
- Email: roskonenov@gmail.com

---

## 🙏 Acknowledgments

- Spring Boot documentation
- Spring Security guides
- PostgreSQL community
- ImgBB API

---

⭐ If you found this project helpful, please give it a star!