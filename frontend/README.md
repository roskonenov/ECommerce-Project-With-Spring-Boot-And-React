# 🛒 ECommerce Frontend - Professional Masterclass Project

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.10.1-764ABC?logo=redux)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?logo=tailwind-css)
![Material--UI](https://img.shields.io/badge/Material--UI-7.3.5-0081CB?logo=material-ui)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)
![PayPal](https://img.shields.io/badge/PayPal-Payments-00457C?logo=paypal)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase)

A modern, full-featured eCommerce React application built with cutting-edge technologies. This project showcases professional development practices including role-based access control, secure payment processing, and comprehensive admin management capabilities.

## � Live Demo

🚀 **View the live application**: [https://sb-ecom-489613.web.app/](https://sb-ecom-489613.web.app/)

The frontend is deployed on **Firebase Hosting** for fast, reliable delivery. Note that the backend (deployed on Google Cloud Platform) may take 15-20 seconds to wake up on first access due to cold starts.

## �🌟 Features

### 🛍️ Customer Experience
- **Product Discovery**: Browse and filter products with pagination
- **Shopping Cart**: Add, remove, and manage cart items with persistent storage
- **Secure Checkout**: Multi-step checkout with address management
- **Payment Options**: Integrated Stripe and PayPal payments
- **Order Tracking**: View order history and status updates
- **User Authentication**: Secure login and registration system

### 👨‍💼 Admin & Seller Management
- **Dashboard**: Comprehensive metrics and overview
- **Product Management**: CRUD operations with image uploads
- **Category Management**: Organize products by categories
- **Order Management**: View and update order statuses
- **User Management**: Admin control over system users
- **Role-Based Access**: Different permissions for admin vs seller roles

### 🔧 Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Redux Toolkit with persistent cart and auth
- **Form Validation**: React Hook Form with comprehensive validation
- **API Integration**: Axios-based communication with Spring Boot backend
- **Error Handling**: Global error states and user-friendly messages
- **Loading States**: Skeleton loaders and spinners for better UX

## 🏗️ Project Structure

```
frontend/
├── public/                          # Static assets
├── src/
│   ├── api/
│   │   └── api.js                   # Axios configuration
│   ├── components/
│   │   ├── admin/                   # Admin panel components
│   │   │   ├── dashboard/           # Dashboard & metrics
│   │   │   ├── categories/          # Category management
│   │   │   ├── products/            # Product CRUD with uploads
│   │   │   ├── orders/              # Order management
│   │   │   └── user/                # User management
│   │   ├── auth/                    # Login & registration
│   │   ├── cart/                    # Shopping cart components
│   │   ├── checkout/                # Multi-step checkout flow
│   │   │   ├── AddressList.jsx      # Address selection
│   │   │   ├── PaymentMethod.jsx    # Payment method choice
│   │   │   ├── StripePayment.jsx    # Stripe integration
│   │   │   ├── PayPalPayment.jsx    # PayPal integration
│   │   │   └── OrderSummary.jsx     # Order review
│   │   ├── contact/                 # Contact form
│   │   ├── guards/                  # Route protection
│   │   ├── home/                    # Homepage & hero
│   │   ├── navigation/              # Navbar & menus
│   │   ├── products/                # Product listing & filters
│   │   └── shared/                  # Reusable components
│   │       ├── ProductCard.jsx      # Product display
│   │       ├── Modal.jsx            # Generic modals
│   │       ├── Paginations.jsx      # Pagination
│   │       └── Skeleton.jsx         # Loading states
│   ├── hooks/                       # Custom React hooks
│   │   ├── useCategoryFilter.js     # Category filtering
│   │   ├── useOrdersFilter.js       # Orders filtering
│   │   ├── useProductsFilter.js     # Products filtering
│   │   └── useUsersFilter.js        # Users filtering
│   ├── store/                       # Redux state management
│   │   ├── store.js                 # Store configuration
│   │   ├── actions/                 # Redux thunks
│   │   └── reducers/                # State slices
│   ├── utils/                       # Utility functions
│   │   ├── currencyFormatter.js     # Price formatting
│   │   ├── getCartSignature.js      # Cart change detection
│   │   └── truncateText.js          # Text utilities
│   ├── App.jsx                      # Main app component
│   └── main.jsx                     # React entry point
├── vite.config.js                   # Vite configuration
├── firebase.json                    # Firebase hosting
├── eslint.config.js                 # Linting rules
└── package.json                     # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Spring Boot backend running (default: http://localhost:8080)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sb-ecom/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_BACK_END_URL=http://localhost:8080
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Build & Deployment

This project is configured for deployment on **Firebase Hosting**, providing global CDN distribution and automatic SSL certificates.

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Firebase Hosting
npm run deploy
```

The live version is available at: [https://sb-ecom-489613.web.app/](https://sb-ecom-489613.web.app/)

## 🛠️ Technologies Used

### Core Framework
- **React 19.1.1** - Modern React with concurrent features
- **Vite 7.1.7** - Fast build tool with SWC compiler

### State Management
- **Redux Toolkit** - Efficient state management
- **React-Redux** - React bindings for Redux

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - Component library for complex UI
- **Headless UI** - Accessible unstyled components
- **React Icons** - Icon library

### Forms & Validation
- **React Hook Form** - Performant forms with validation
- **Axios** - HTTP client for API calls

### Payments
- **Stripe** - Credit card processing
- **PayPal** - Alternative payment method

### Development Tools
- **ESLint** - Code linting
- **Firebase Hosting** - Deployment platform

## 🔌 API Integration

This frontend communicates with a Spring Boot backend API deployed on **Google Cloud Platform (GCP)**. The backend may take **15-20 seconds** to wake up on first access due to cold starts in the cloud environment.

Key endpoints include:

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Products**: `/api/products` (CRUD operations)
- **Categories**: `/api/categories`
- **Orders**: `/api/orders`
- **Users**: `/api/users` (admin only)
- **Cart**: `/api/cart`
- **Payments**: `/api/payments/stripe`, `/api/payments/paypal`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Route Guards** - Protected routes with role checking
- **Input Validation** - Client-side validation with React Hook Form
- **Secure Payments** - PCI-compliant payment processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the "Java Spring Boot Professional eCommerce Project Masterclass" and is intended for educational purposes.

## 🙏 Acknowledgments

- Built as part of the comprehensive eCommerce masterclass
- Demonstrates modern React development practices
- Showcases integration with multiple payment providers
- Implements professional admin panel design patterns

---

**Happy Shopping! 🛒✨**