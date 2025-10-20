<p align="center">
  <a href="https://gym360bd.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Frontend-Live-green?style=for-the-badge&logo=vercel" alt="Frontend Live" />
  </a>
  <a href="https://gym-server-br2c.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/Backend-Live-blue?style=for-the-badge&logo=render" alt="Backend Live" />
  </a>
</p>

# Project Title: Gym Management System

## Live Demo

You can access the live version of the project here: [Live Link](https://gym360bd.vercel.app)

## Entity-Relationship (ER) Diagram

Here is the ER diagram of the project to help visualize the database structure.

![ER Diagram](https://i.ibb.co.com/gLXkkL9W/er-diagram.png)

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/apucsd/gym-server
    ```

**Create a `.env` file:**

In the root directory of the project, create a `.env` file and add the following variables. Adjust the values according to your setup.

```env
# Basic
NODE_ENV=production
DATABASE_URL=''
IP_ADDRESS=192.168.1.113
PORT=4000
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_TOKEN_SECRET=jwt_secret
JWT_REFRESH_TOKEN_SECRET=jwt_secret_refresh_token
JWT_SECRET=jwt_secret
JWT_ACCESS_TOKEN_EXPIRED_IN=7d
JWT_REFRESH_TOKEN_EXPIRED_IN = 30d
JWT_RESET_TOKEN_EXPIRED_IN = 1h

```

## Features

-   **Authentication API:** Complete authentication system using JWT for secure token-based authentication and bcrypt for password hashing.
-   **File Upload:** Implemented using Multer with efficient file handling and short-term storage.
-   **Data Validation:** Robust data validation using Zod and Mongoose s
-   **Logging:** Logging with Winston and file rotation using DailyRotateFile.
-   **API Request Logging:** Logging API requests using Morgan.

## API Documentation

### Auth APIs (`/api/v1/auth`)
- `POST /login`: User login (JWT, sets refresh token cookie)
- `POST /refresh-token`: Get new access token using refresh token
- `POST /forget-password`: Request password reset OTP via email
- `POST /verify-otp`: Verify OTP sent to email
- `POST /resend-otp`: Resend OTP to email
- `POST /reset-password`: Reset password using OTP
- `POST /change-password`: Change password (requires authentication)

### Booking APIs (`/api/v1/bookings`)
- `POST /`: Create a booking (Trainee only)
- `GET /`: Get all bookings (Admin, Super Admin, Trainer)
- `GET /my-bookings`: Get bookings for the logged-in user (Trainee, Admin, Trainer, Super Admin)
- `PATCH /:id`: Update booking status (Admin, Super Admin, Trainer)

### Class APIs (`/api/v1/classes`)
- `POST /create-class`: Create a gym class (validates trainer/trainees, 2-hour duration, ≤10 trainees)
- `PATCH /update-class`: Update gym class details
- `PATCH /`: Get all gym classes (pagination, filter by date)

### Schedule APIs (`/api/v1/schedules`)
- `POST /`: Create a schedule
- `GET /`: Get all schedules
- `GET /:id`: Get schedule by ID
- `PATCH /:id`: Update schedule by ID
- `DELETE /:id`: Delete schedule by ID

### User APIs (`/api/v1/users`)
- `GET /profile`: Get logged-in user's profile
- `POST /create-user`: Create a new user
- `PATCH /update-profile`: Update logged-in user's profile (with file upload)
- `PATCH /update-user-by-id/:id`: Update user by ID (Admin, Super Admin)
- `GET /all-user`: Get all users (Admin, Super Admin)
- `GET /all-trainer`: Get all trainers (Admin, Super Admin)


## Tech Stack

-   Typescript
-   Node.js
-   Express
-   Mongoose
-   Bcrypt
-   JWT
-   NodeMailer
-   Multer
-   ESLint
-   Prettier
-   Winston
-   Daily-winston-rotate-file
-   Morgen
-   Socket

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

-   Node.js
-   npm or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/apucsd/gym-server.git
    cd gym-server
    ```

2. **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Using yarn:

    ```bash
    yarn install
    ```

3. **Run the project:**

    Using npm:

    ```bash
    npm run dev
    ```

    Using yarn:

    ```bash
    yarn run dev
    ```

### Running the Tests

Explain how to run the automated tests for this system.

```bash
npm test
```

---

Made with ❤️ by [Apu Sutra Dhar](https://apusutradhar.vercel.app)
