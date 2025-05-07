# EduCrew - E-Learning Platform

EduCrew is a MERN-based (MongoDB, Express, React, Node.js) E-Learning Platform that allows users to enroll in courses, track their progress, and manage their learning efficiently. It provides student, instructor, and admin dashboards, offering robust features for managing courses, payments, and user interaction. The platform is designed to enhance the e-learning experience, making it secure, scalable, and easy to use.

## Features

- **User Roles**: Students, Instructors, and Admins, each with their specific functionalities.
- **Course Enrollment**: Students can browse and enroll in various courses.
- **Progress Tracking**: Students can track their learning progress through a dynamic dashboard.
- **Course Creation**: Instructors can create, update, and delete courses with ease.
- **Admin Control**: Admins have full access to manage users, courses, and other system settings.
- **Payment Integration**: Stripe integration for secure course purchases.
- **Media Hosting**: Cloudinary integration for managing course images and videos.
- **Secure Authentication**: JWT (JSON Web Tokens) for secure login and authentication.
- **Email Notifications**: Nodemailer integration for sending email notifications to users.
- **Backend Security**: The backend is fortified with **Helmet**, **Morgan**, and **Rate Limiting** to safeguard against potential attacks.
- **Data Visualization**: Interactive charts and tables to track learning analytics using **Chart.js** and **React Table**.

## Tech Stack

### Frontend

- **HTML** & **CSS** - Basic building blocks for structure and styling.
- **Tailwind CSS** - Utility-first CSS framework for responsive and fast UI development.
- **React** - Frontend framework for building dynamic user interfaces.
- **TypeScript** - Superset of JavaScript to add static typing, ensuring better scalability and developer experience.
- **Redux** - For state management across the application.
- **React Table** - To manage and display complex data in table format.
- **Chart.js** - For visualizing learning progress with interactive charts.

### Backend

- **Node.js** & **Express** - Server-side JavaScript runtime and framework to build RESTful APIs.
- **MongoDB** - NoSQL database for storing user data, course details, and progress.
- **JWT** - For secure authentication and authorization.
- **Stripe** - Payment gateway integration to handle secure transactions for course enrollments.
- **Cloudinary** - Image and video storage solution for hosting media related to courses.
- **Nodemailer** - For sending email notifications to users.
- **Helmet** - For securing HTTP headers and preventing attacks.
- **Morgan** - HTTP request logger middleware for better logging and monitoring.
- **Rate Limiting** - To prevent DDoS and brute force attacks by limiting the number of requests a user can make.

## Installation

Follow the steps below to set up the project on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/saravana-devx/EduCrew.git
cd educrew

```

### 2.  Install dependencies

Run the following command to install both backend and frontend dependencies:

```tsx
npm install
```

### 3. Environment Variables

Create a `.env` file in the server folder of the project and add the following environment variables:

```

DATABASE_URL=<Your MongoDB connection string>
JWT_SECRET=<Your JWT Secret Key>

MAIL_HOST=<Your email SMTP host (e.g., [smtp.gmail.com](http://smtp.gmail.com/))>
MAIL_USER=<Your email address>
MAIL_PASS=<Your email password>

# MAIL_PORT=587 # Optional: default port for SMTP is 587

CLOUD_NAME=<Your Cloudinary cloud name>
CLOUDINARY_API_KEY=<Your Cloudinary API key>
CLOUDINARY_API_SECRET=<Your Cloudinary API secret>

PUBLISHABLE_KEY=<Your Stripe publishable key>
STRIPE_SECRET_KEY=<Your Stripe secret key>
STRIPE_WEBHOOK_SECRET=<Your Stripe webhook secret>
```

Create another `.env` file in the client folder of the project and add the following environment variables:

```tsx
VITE_STRIPE_PUBLIC_KEY=<Your Vite Stripe public key>
```

### 4. Run the Development Server

To run the project in development mode, use:

```tsx
npm run dev
```

This will start both the frontend and backend servers.

### 5. Access the Application

Once the server is running, you can access the app in your browser at `http://localhost:5173`.