# React Coupon Management System

A React TypeScript frontend for coupon management with Windows authentication, using Material-UI components.

## Features

- Windows Authentication
- Coupon Management (Create, View)
- User Coupon Assignment
- Dashboard with Statistics
- Responsive Design

## Technologies Used

- React 18 with TypeScript
- Material-UI (MUI) Components
- React Router v6
- Vite for build tooling
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd react-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3001

## Project Structure

```
src/
├── api/
│   └── coupons.ts
├── components/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── CouponManagement.tsx
│   ├── MyCoupons.tsx
│   └── CouponAssignment.tsx
├── hooks/
│   └── useAuth.ts
├── App.tsx
└── main.tsx
```

## Authentication

This application uses Windows Authentication. Users can log in with their Windows username (DOMAIN\username or email format).

## Components

### Login
Handles user authentication with Windows credentials.

### Dashboard
Main dashboard showing coupon statistics and quick actions.

### Coupon Management
Allows administrators to create and manage coupons.

### My Coupons
Displays coupons assigned to the logged-in user.

### Coupon Assignment
Allows administrators to assign coupons to specific users.

## API Integration

The frontend connects to a FastAPI backend running on http://localhost:8000 by default. You can change this by setting the `VITE_API_BASE_URL` environment variable in the `.env` file.

## Development

This project uses Vite for fast development and build processes.

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```