# Payment App

## Overview

The Payment App is a full-stack web application which demonstrate streamline user registration, authentication, and money transfer processes. Built with a Node.js backend using Express, MongoDB for data storage, and a React frontend, the app provides a secure and efficient platform for financial transactions.

## Features

- **User Registration**: Users can sign up by providing essential information, including a unique username, password, first name, and last name.

- **User Authentication**: Secure user authentication is implemented using JSON Web Tokens (JWT). The system ensures the confidentiality and integrity of user data.

- **Dashboard**: The user dashboard provides an overview of the account balance and allows users to manage their profiles.

- **Money Transfer**: Users can initiate money transfers between accounts seamlessly. The application ensures the safety and accuracy of financial transactions.

## Getting Started

### Backend

1. Clone the repository: `git clone https://github.com/ritam099/Wsd-paymentXapp.git`
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file with MongoDB connection details and JWT secret.

   ```
   MONGODB_URL=your_mongodb_connection_string
   JSON_WEB_TOKEN_SECRET=your_jwt_secret
   ```

5. Run the backend server: `node app.js`

### Frontend

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the frontend development server: `npm run dev`
4. Asses the app at-
    - for sign-up: `http://localhost:5173/sign-up`
    - for sign-in: `http://localhost:5173/sign-in`
    - for dashboard: `http://localhost:5173/dashboard`

## Usage

1. **Sign Up**: Visit the "Sign Up" page to create a new account by providing the required information.

2. **Sign In**: After signing up, users can log in using their credentials on the "Sign In" page.

3. **Dashboard**: Access the user dashboard to view account details, including the current balance.

4. **Send Money**: Use the "Send Money" page to initiate secure money transfers to other users.

5. **View Transactions**: Users can view their transactions and filter the credit and debit
 transactions.

**Ouputs**
![image](https://github.com/user-attachments/assets/9b85bb24-021e-4c23-b4cc-1e8c788049f8)
![image](https://github.com/user-attachments/assets/74471ae7-8ce9-488a-8650-de0e824aed94)
![image](https://github.com/user-attachments/assets/c5c7813b-b65e-4db5-ab6a-a618e85e82ff)
![image](https://github.com/user-attachments/assets/94a58afb-c1d6-4b3b-98e9-0693f2bf7620)
![image](https://github.com/user-attachments/assets/001df365-2a36-4967-9e9b-fcb5ea58990e)




