# NidhiPay

A modern full-stack fin-tech application.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Vite, Chart.js, React Router v6, react-google-recaptcha
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, express-rate-limit, bcryptjs

## Project Structure
- `/frontend` - React application with Vite
- `/backend` - Node.js Express API

## Prerequisites
- Node.js (v16+)
- MongoDB running locally on `mongodb://127.0.0.1:27017`

## How to Run Locally

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
   *The server will run on `http://localhost:5000`*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:3000` or the port shown in your terminal.*

## Features
- Complete Authentication (Register, Login, JWT Protection)
- Interactive Dashboard with Financial Charts
- Money Transfers with Fraud Detection Warning (> $10,000)
- Transaction History with Filtering capabilities
- Admin Panel to view all users and monitor suspicious activities
- Modern Glassmorphism UI with Tailwind CSS

## Security Enhancements
- **Google reCAPTCHA v2:** Integrated on login and registration pages.
- **2FA (Two-Factor Authentication):** Enabled in profile, sends OTP for email-based verification log-in.
- **Account Lockout:** Locks account for 10 minutes after 5 consecutive failed login attempts.
- **Login Rate Limiter:** Prevents brute-force attacks via express-rate-limit (10 requests/minute).
- **Secure Password Storage:** bcrypt with >= 10 salt rounds used for user passwords and security PINs.
- **Transfer Security:** Security PIN required for all transactions. OTP validation required for transactions over $500.
- **Audit & Security Logs:** Tracks user login activity, failed attempts, IP addresses, password changes, and 2FA toggles. Features visualized on the user Profile.

## API Documentation

### Auth Routes
- `POST /api/auth/register` - Create a new user.
- `POST /api/auth/login` - Authenticate user, rate limited, handles account lockout logic.
- `POST /api/auth/verify-captcha` - Validates the frontend captcha token.
- `POST /api/auth/send-otp` - Dispatch 2FA OTP to the user's email.
- `POST /api/auth/verify-otp` - Validate the 2FA OTP and securely log in the user.

### Account Routes (Protected)
- `GET /api/account/balance` - Retrieve balance and account number.
- `POST /api/account/deposit` - Deposit money into your account.
- `POST /api/account/withdraw` - Withdraw funds from your account.
- `POST /api/account/transfer` - Transfer funds to another account. Requires PIN. OTP required if > $500.
- `GET /api/account/transactions` - View personal transaction history.

### User Routes (Protected)
- `PUT /api/users/update-profile` - Update basic profile details.
- `POST /api/users/reset-password` - Change account password conditionally. Requires current password.
- `POST /api/users/update-pin` - Change user's 4-digit security PIN.
- `POST /api/users/toggle-2fa` - Toggle the Two-Factor Authentication requirement for logins.
- `GET /api/users/security-logs` - Retrieve detailed security logs (login, transfers, settings changes).
- `GET /api/users/login-activity` - Retrieve historical device / IP login attempts.

### Admin Routes (Protected - Admin Only)
- `GET /api/admin/users` - Fetch a list of all users.
- `PUT /api/admin/users/:userId/block` - Toggle user's block status.

## Note on Admin Access
To test the admin panel, register a new user, then connect to your MongoDB instance and configure their role to `'admin'` manually in the `users` collection.
