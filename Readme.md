# 📦 Shipsy - Shipment Management System

> A modern Shipment Management System built to streamline shipment tracking, status monitoring, and reporting. Shipsy provides real-time visibility into shipments with a clean dashboard, interactive statistics, secure authentication, and full CRUD capabilities.

## 🌟 Live Demo

- client: 
- server API: 
- Postman Documentation: 

## ✨ Features

- JWT-based Authentication – Secure login/signup system
- Interactive Dashboard – Real-time statistics and shipment overview
- Shipment CRUD – Complete shipment lifecycle management
- Advanced Filtering – Search and filter shipments by title, status, creator, and ID
- Pagination – Efficient data browsing
- Responsive Design – Works seamlessly on all devices
- Protected Routes – Token-gated routes on the client
- Modern UI/UX – Tailwind CSS + Framer Motion

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Framer Motion
- React Toastify

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication (jsonwebtoken)
- Password hashing (bcrypt)
- CORS middleware

### DevOps & Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Version Control: Git & GitHub

## 📋 Entity Schema

### Shipment Model
| Field | Type | Required | Description |
|------|-----|---------|-------------|
| `title` | String | ✅ | Shipment title/description |
| `status` | Enum | ✅ | `NEW`, `IN-TRANSIT`, `DELIVERED`, `CANCELLED` |
| `fragile` | Boolean | ✅ | Indicates if shipment is fragile |
| `weightKg` | Number | ✅ | Weight in kilograms |
| `distanceKm` | Number | ✅ | Distance in kilometers |
| `baseRate` | Number | ✅ | Base shipping rate |
| `cost` | Number | Auto | Calculated: `weightKg * baseRate + distanceKm * 0.5` |
| `createdBy` | Embedded | ✅ | `{ _id, username }` of creator |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

## 📁 Project Structure

```
shipsy/
├── app/
│   ├── client/                      # React frontend (Vite)
│   │   ├── public/                  # Static assets
│   │   └── src/
│   │       ├── components/
│   │       │   ├── About.jsx
│   │       │   ├── AllShipments.jsx
│   │       │   ├── Chatbot.jsx
│   │       │   ├── CreateShipmentModel.jsx
│   │       │   ├── DashboardNavbar.jsx
│   │       │   ├── DashboardStats.jsx
│   │       │   ├── DashboardStatsCard.jsx
│   │       │   ├── DeleteConfirmationModal.jsx
│   │       │   ├── EditShipmentModal.jsx
│   │       │   ├── Features.jsx
│   │       │   ├── MyShipments.jsx
│   │       │   ├── Pagination.jsx
│   │       │   ├── Pricing.jsx
│   │       │   ├── ShipmentAction.jsx
│   │       │   ├── ShipmentTable.jsx
│   │       │   └── landing.jsx
│   │       ├── config/              # API base URL (config.js)
│   │       ├── App.jsx              # Routes
│   │       └── main.jsx
│   │
│   └── server/                      # Express backend
│       ├── config/
│       │   └── db.js                # MongoDB connection
│       ├── middleware/
│       │   └── auth.js              # JWT auth middleware
│       ├── models/
│       │   ├── User.js
│       │   └── Shipment.js
│       ├── routes/
│       │   ├── Auth.js
│       │   ├── Home.js              # Home/health/docs
│       │   └── Shipment.js          # Shipment CRUD routes
│       └── index.js                 # Server entry
│
└── docs/
    ├── architecture.md
    ├── ai-usages.md
    └── ShipsyAPI.postman_collection.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account
- Git

### 1) Clone the repository
```bash
git clone https://github.com/yourusername/shipsy.git
cd shipsy
```

### 2) Backend setup
```bash
cd app/server
npm install
```
Create `.env` in `app/server/`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shipsy
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
PORT=5001
```
Run the server:
```bash
npm run dev   # or: npm start
# Server: http://localhost:5001
```

### 3) Frontend setup
```bash
cd ../../app/client
npm install
```
Create `.env` in `app/client/` (optional; defaults to http://localhost:5001):
```env
VITE_BACKEND_URL=http://localhost:5001
```
Run the client:
```bash
npm run dev
# App: http://localhost:5173
```

## 📊 API Endpoints

| Endpoint | Method | Description | Auth |
|---------|--------|-------------|------|
| `/` | GET | Home route | ❌ |
| `/auth/login` | POST | User login | ❌ |
| `/auth/signup` | POST | User registration | ❌ |
| `/auth/fetch` | GET | Get user profile | ✅ |
| `/shipment/` | GET | Get all shipments | ✅ |
| `/shipment/my` | GET | Get current user shipments | ✅ |
| `/shipment/:id` | GET | Get a shipment by id | ✅ |
| `/shipment/` | POST | Create shipment | ✅ |
| `/shipment/:id` | PATCH | Update shipment | ✅ |
| `/shipment/:id` | DELETE | Delete shipment | ✅ |

## 🖼️ Screenshots

Place screenshots under `docs/images/` (optional) and reference them here.

- Landing Page – `docs/images/landing.png`
- Dashboard – `docs/images/dashboard.png`
- My Shipments – `docs/images/myshipments.png`
- All Shipments – `docs/images/allshipments.png`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes
```bash
git commit -m "feat: add amazing feature"
```
4. Push and open a Pull Request
```bash
git push origin feature/amazing-feature
```

Guidelines
- Match existing code style and formatting
- Write clear commit messages
- Update docs when needed

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:5001
```

## 🚀 Deployment

### Frontend (Vercel)
- Set env: `VITE_BACKEND_URL=https://your-backend-url.com`

### Backend (Render)
- Set env: `MONGODB_URI`, `JWT_SECRET`, `PORT`

---

<div align="center">
  <p>⭐ Star this repository if it helped you!</p>
  <p>Built with ❤️ using React, Express.js, and MongoDB</p>
</div>
