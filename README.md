# Xentrox Solution Website

Official website for **Xentrox Solutions** — a full-stack MERN application with a React + Vite frontend and an Express + MongoDB backend, featuring a complete admin dashboard.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB instance)

---

## ⚙️ Backend Setup

The backend is an Express.js API with MongoDB (Mongoose).

### 1. Navigate to the server folder

```bash
cd server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```


### 4. Start the backend server

```bash
cd server
node server.js
# Or for auto-restart on changes:
npm run dev
```
```

Backend runs at: **http://localhost:8080**

---

## 🖥️ Frontend Setup

The frontend is a React + Vite application.

### 1. Navigate to the project root

```bash
cd xentrox-solution-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Frontend runs at: **http://localhost:3000**

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## 🔐 Admin Panel

Once both frontend and backend are running, access the admin panel at:

**http://localhost:3000/admin**

On first visit, you'll be prompted to **create a super administrator account**. After setup, sign in to access the full dashboard.

### Admin Dashboard Features

| Section       | Description                                         |
|---------------|-----------------------------------------------------|
| **Overview**  | Stats cards, recent activity feed, quick actions     |
| **Users**     | CRUD for users with role management (Super Admin, Admin, User) |
| **Categories**| CRUD for project/service categories                  |
| **Portfolio** | CRUD for portfolio projects with image upload        |
| **Careers**   | CRUD for job postings, active status, and applications|
| **Enquiries** | View, mark as read, and delete contact form submissions |
| **Blogs**     | CRUD for blog posts with cover images and tags       |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint                  | Access  | Description             |
|--------|---------------------------|---------|-------------------------|
| GET    | `/api/auth/setup-status`  | Public  | Check if admin exists   |
| POST   | `/api/auth/setup`         | Public  | Create first admin      |
| POST   | `/api/auth/login`         | Public  | Login and get JWT token |

### Users (Protected — Super Admin only)
| Method | Endpoint          | Description      |
|--------|-------------------|------------------|
| GET    | `/api/users`      | List all users   |
| POST   | `/api/users`      | Create user      |
| PUT    | `/api/users/:id`  | Update user      |
| DELETE | `/api/users/:id`  | Delete user      |

### Categories
| Method | Endpoint              | Access          | Description        |
|--------|-----------------------|-----------------|--------------------|
| GET    | `/api/categories`     | Public          | List categories    |
| POST   | `/api/categories`     | Protected       | Create category    |
| PUT    | `/api/categories/:id` | Protected       | Update category    |
| DELETE | `/api/categories/:id` | Protected       | Delete category    |

### Portfolio
| Method | Endpoint              | Access          | Description        |
|--------|-----------------------|-----------------|--------------------|
| GET    | `/api/portfolio`      | Public          | List projects      |
| POST   | `/api/portfolio`      | Protected       | Create project     |
| PUT    | `/api/portfolio/:id`  | Protected       | Update project     |
| DELETE | `/api/portfolio/:id`  | Protected       | Delete project     |

### Careers
| Method | Endpoint            | Access          | Description          |
|--------|---------------------|-----------------|----------------------|
| GET    | `/api/careers`      | Public          | List active jobs     |
| POST   | `/api/careers`      | Protected       | Create job opening   |
| PUT    | `/api/careers/:id`  | Protected       | Update job opening   |
| DELETE | `/api/careers/:id`  | Protected       | Delete job opening   |

### Enquiries
| Method | Endpoint                     | Access          | Description         |
|--------|------------------------------|-----------------|---------------------|
| POST   | `/api/enquiries`             | Public          | Submit enquiry      |
| GET    | `/api/enquiries`             | Protected       | List enquiries      |
| PUT    | `/api/enquiries/:id/read`    | Protected       | Mark as read        |
| DELETE | `/api/enquiries/:id`         | Protected       | Delete enquiry      |

### Blogs
| Method | Endpoint           | Access          | Description      |
|--------|--------------------|-----------------|------------------|
| GET    | `/api/blogs`       | Public          | List blogs       |
| POST   | `/api/blogs`       | Protected       | Create blog      |
| PUT    | `/api/blogs/:id`   | Protected       | Update blog      |
| DELETE | `/api/blogs/:id`   | Protected       | Delete blog      |

---

## 📁 Project Structure

```
xentrox-solution-website/
├── public/                  # Static assets
├── server/                  # Backend (Express + Mongoose)
│   ├── config/db.js         # MongoDB connection
│   ├── controllers/         # Route handlers
│   ├── middleware/           # Auth & error middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes
│   ├── uploads/             # Uploaded images
│   ├── .env.example
│   ├── package.json
│   └── server.js            # Entry point
├── src/                     # Frontend (React + Vite)
│   ├── bits/                # Reusable UI utilities
│   ├── components/
│   │   ├── admin/           # Admin panel components
│   │   ├── home/            # Landing page
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   └── ...              # Other pages
│   ├── data/                # Static data
│   ├── layouts/             # Layout wrappers
│   ├── routers/             # Route definitions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — UI framework
- **Vite** — Build tool & dev server
- **Tailwind CSS v4** — Styling
- **GSAP** — Animations
- **React Router v7** — Routing
- **Lucide React** — Icons

### Backend
- **Express.js** — Web framework
- **MongoDB + Mongoose** — Database & ODM
- **JWT (jsonwebtoken)** — Authentication
- **bcryptjs** — Password hashing
- **Multer** — File uploads
- **CORS** — Cross-origin resource sharing
