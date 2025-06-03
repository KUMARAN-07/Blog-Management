# Blog Management System

A full-stack Blog Management System that enables users to create, read, update, and delete blog posts. This application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and provides a seamless interface for managing blog content.

## Features

- **User Authentication**: Secure login and registration functionalities.
- **Create Blog Posts**: Users can compose and publish new blog entries.
- **Read Blog Posts**: View a list of all blog posts with detailed views.
- **Update Blog Posts**: Edit existing blog entries.
- **Delete Blog Posts**: Remove blog entries as needed.
- **Responsive Design**: Optimized for various device sizes.

## 🛠️ Technologies Used

- **Frontend**:
  - React.js
  - HTML5
  - CSS3
  - JavaScript

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## 📂 Project Structure

Blog-Management/ ├── blog-management-backend/ │   ├── controllers/ │   ├── models/ │   ├── routes/ │   ├── app.js │   └── ... ├── blog-management-frontend/ │   ├── public/ │   ├── src/ │   │   ├── components/ │   │   ├── pages/ │   │   ├── App.js │   │   └── ... │   └── ... └── README.md

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd blog-management-backend

2. Install dependencies:

npm install


3. Create a .env file and add your MongoDB connection string:

MONGODB_URI=your_mongodb_connection_string


4. Start the backend server:

npm start



Frontend Setup

1. Navigate to the frontend directory:

cd blog-management-frontend


2. Install dependencies:

npm install


3. Start the frontend development server:

npm start



The application should now be running, with the frontend accessible at http://localhost:3000 and the backend API at http://localhost:5000.

📬 API Endpoints

Authentication

POST /api/auth/register - Register a new user

POST /api/auth/login - Login with existing credentials


Blog Posts

GET /api/posts - Retrieve all blog posts

GET /api/posts/:id - Retrieve a specific blog post

POST /api/posts - Create a new blog post

PUT /api/posts/:id - Update an existing blog post

DELETE /api/posts/:id - Delete a blog post


🧑‍💻 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

📄 License

This project is licensed under the MIT License.

📞 Contact

For any inquiries or feedback, please contact [kumaran.official1805@gmail.com].


