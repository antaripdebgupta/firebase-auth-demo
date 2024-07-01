# Next.js Firebase Authentication Demo

This project demonstrates user authentication in a Next.js application using Firebase.
It implements both email/password and Google sign-in methods.

## Features

- Email/Password Authentication
- Google Authentication
- Phone Number Authentication
- User Registration & Login
- Reset Password | Email Verification
- Protected Routes

## Prerequisites

- Node.js and npm (or yarn) installed on your system.
- A Firebase project with Email/Password and Google sign-in methods enabled.

## Setup

1. To get started with this project, clone the repository and install the dependencies:
```bash
git clone https://github.com/antaripdebgupta/firebase-auth-demo.git
cd firebase-auth-demo
npm install
```

2. Configure Firebase:
- Create a .env.local file in the project root.
- Add your Firebase project configuration details to the .env.local file. You can find these details in the Firebase console project settings. Here's an example:
```bash 
NEXT_PUBLIC_FIREBASE_API_KEY=api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-id
# ... other Firebase configuration variables
```

## Running the application
Start the development server:
```bash
 npm run dev
 ```
 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS ](https://tailwindcss.com/) (optional)

This is a basic template. You can expand it to include additional information about your project, deployment instructions, and any specific functionalities you've implemented.