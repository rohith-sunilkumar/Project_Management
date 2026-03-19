# Project Management Application

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node) designed to help teams and individuals manage projects, assign tasks, and track progress efficiently. The application features role-based access control, distinguishing between Administrators and regular Users.

## 🚀 Tech Stack

### Frontend
- **React 19** with **Vite**: For a fast and responsive user interface.
- **Tailwind CSS**: For modern and utility-first styling.
- **React Router DOM**: For client-side routing.
- **Axios**: For making API requests to the backend.

### Backend
- **Node.js** & **Express.js**: For building the RESTful API server.
- **MongoDB** & **Mongoose**: For database management and object data modeling.
- **JSON Web Tokens (JWT)**: For secure user authentication and authorization.
- **bcryptjs**: For securely hashing user passwords.

## 🔑 Features & Functionalities

### 1. Authentication & Authorization
- **User Registration**: New users can create an account using their name, email, and password.
- **User Login**: Secure login process generating HTTP-only JWT cookies or tokens.
- **Role-Based Access Control (RBAC)**: The system supports two distinct roles: `Admin` and `User`. Routes are protected so that users can only access information relevant to their permissions.

### 2. Admin Capabilities
The application provides a dedicated Admin portal (`/admin`) with the following functionalities:
- **Admin Dashboard**: Overview of system metrics, active projects, tasks, and users.
- **User Management**: Admins can view and manage registered users within the system.
- **Project Management**: 
  - Create new projects and assign them to specific users.
  - Set project titles, descriptions, and due dates.
  - View, edit, and delete existing projects.
- **Task Management**:
  - Create tasks under specific projects.
  - Set task titles, descriptions, and due dates.
  - Monitor the progress and status of all tasks across projects.

### 3. User Capabilities
Regular users have access to a personalized dashboard tailored to their ongoing work:
- **User Dashboard**: A centralized view of assigned projects and tasks.
- **View Projects**: Users can view the details of projects they are assigned to.
- **View & Update Tasks**: 
  - Users can view all tasks associated with their assigned projects.
  - Users can update the status of their assigned tasks (e.g., from `Pending` to `Completed`).

### 4. Core Data Models
The application relies on three core interconnected entities:
- **User Model**: Stores credentials, user details, and role (`admin` or `user`).
- **Project Model**: Stores project metadata (title, description, due date) and maintains a reference to the assigned `User`.
- **Task Model**: Stores task details, its current `status`, due date, and maintains a reference to the parent `Project`.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Project_Management
   ```

2. **Backend Setup:**
   ```bash
   # Install backend dependencies
   npm install
   
3. **Frontend Setup:**
   ```bash
   cd client
   npm install
   ```

4. **Running the Application Locally:**
   - **Start the backend server:**
     ```bash
     # From the root directory
     npm start
     ```
   - **Start the frontend development server:**
     ```bash
     # From the client directory
     npm run dev
     ```

## 🌐 API Routes Overview

- **`/api/users`**: Endpoints for user authentication (register, login, logout) and fetching user data.
- **`/api/projects`**: Endpoints for CRUD operations on projects.
- **`/api/tasks`**: Endpoints for CRUD operations on tasks.
- **`/api/admin`**: Protected endpoints specifically for admin-level operations.
- **`/api/dashboard`**: Endpoints to fetch summary statistics for dashboards.

---
*This README was auto-generated to document the full scope and capabilities of the Project Management system.*
