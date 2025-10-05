# Shipsy Assignment – System Architecture

## 1. Overview
This application is a **Shipment Management System** built to fulfill the Shipsy assignment requirements. It has:
* **Authentication** (JWT-based login)
* **CRUD** for a `Shipment` entity (text, enum, boolean, calculated field)
* **Pagination, filtering, search, sorting**
* **Protected API** and **Protected frontend routes**
* **API documentation** via Postman collection (docs/ShipsyAPI.postman_collection.json)
* **AI Integration (Frontend)** with Google Gemini for intelligent shipment insights

## 2. Tech Stack
### Frontend
* Vite + React (JavaScript)
* Tailwind CSS for styling
* React Router for client-side routing
* Framer Motion for animations
* React Toastify for notifications
* Google Gemini API (client-side) for AI-powered features

### Backend
* Node.js + Express.js
* MongoDB (Atlas) + Mongoose ORM
* JWT for authentication
* bcrypt for password hashing
* CORS middleware

## 3. Entity: `Shipment`
### Fields:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | String | ✅ | Text |
| `status` | Enum | ✅ | Values: `NEW`, `IN_TRANSIT`, `DELIVERED`, `CANCELLED` |
| `fragile` | Boolean | ✅ | True if fragile |
| `weightKg` | Number | ✅ | Used in cost calculation |
| `distanceKm` | Number | ✅ | Used in cost calculation |
| `baseRate` | Number | ✅ | Used in cost calculation |
| `cost` | Number | Auto | **Calculated** = `weightKg × baseRate + distanceKm × 0.5` |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

## 4. Module Breakdown
### Frontend (`app/client/`)
* `public/` - logo and Mp4
* `src/config/` - exports `VITE_BACKEND_URL` and axios instance
* `src/components/` – 
  * AllShipments, MyShipments, ShipmentTable, ShipmentAction, Create/Delete/Edit Shipment
  * Landing, Dashboard, Navbar, Stats, Pagination, Chatbot
  * Features, Pricing, About (public marketing pages)
  * AI: Chatbot in the frontend calls Gemini directly (no backend AI endpoints)

### Backend (`app/server/`)
* `config/db.js` – Connects to MongoDB
* `middleware/auth.js` – JWT validation
* `models/`
  * `User.js` – User Schema
  * `Shipment.js` – Shipment schema
* `routes/`
  * `Auth.js` – Login, Signup and fetch User with token
  * `Shipment.js` – CRUD operations on Shipment Schema
  * `Home.js` – health/info endpoints
* `index.js` – Starts server

## 5. API Endpoints (Backend)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home Route |
| `/auth/login` | POST | Login route |
| `/auth/signup` | POST | SignUp route |
| `/auth/fetch` | GET | Fetch user data using token |
| `/shipment/` | GET | Get all the shipments |
| `/shipment/my` | GET | Get my shipments |
| `/shipment/:id` | GET | Get a particular shipment |
| `/shipment/` | POST | Create a shipment |
| `/shipment/:id` | PATCH | Update a shipment |
| `/shipment/:id` | DELETE | Delete a shipment |


## 6. Data Flow
### Login Flow:
1. User logs in via frontend `/login` → POST `/auth/login`
2. Backend verifies credentials → returns JWT
3. Frontend stores JWT in `localStorage`
4. All future API requests include `Authorization: Bearer <token>`

### CRUD Flow (example Create):
1. User fills shipment form → frontend sends POST `/shipments`
2. Backend calculates `cost` server-side and saves to MongoDB
3. Returns created shipment → UI re-fetches list and updates

### AI Integration Flow (Frontend-only):
1. User opens the Chatbot in the frontend
2. Frontend collects necessary context from the current UI (e.g., selected shipment)
3. Frontend sends the prompt directly to the Google Gemini API using a client API key
4. Gemini returns the response → frontend renders it in the chat/insights UI

## 7. Gemini AI Features (Frontend)
### Implemented AI Capabilities:
* **Shipment Analysis**: Analyze patterns, costs, and efficiency across all shipments
* **Smart Suggestions**: Get recommendations for route optimization and cost reduction
* **Predictive Insights**: Forecast delivery times and identify potential delays
* **Interactive Chat**: Ask natural language questions about shipments
* **Anomaly Detection**: Identify unusual patterns or potential issues
* **Cost Optimization**: Suggestions for reducing shipping costs based on historical data

### Gemini API Integration:
* Model: `gemini-2.0-flash-exp`
* Authentication: Client API key via `VITE_GEMINI_API_KEY` (if enabled)
* Error handling: Graceful fallbacks when AI service is unavailable

## 8. Deployment Architecture
### Frontend
* Built with Vite → Deployed to **Vercel**
* Environment variables:
  * `VITE_BACKEND_URL` points to backend URL
  * `VITE_GEMINI_API_KEY` for client-side AI features (optional)

### Backend
* Node.js + Express → Deployed to **Render**
* Connected to **MongoDB Atlas**
* Environment variables:
  * `MONGODB_URI`
  * `JWT_SECRET`
  * `PORT`

## 9. Security
* JWT for route protection
* Passwords stored as bcrypt hashes
* Pagination limits to prevent large query abuse
* If Gemini is enabled on the client, the API key is stored in frontend env (`VITE_GEMINI_API_KEY`) and not exposed in backend
* Input sanitization for prompts on the client to prevent injection attacks

## 10. Documentation
* **Swagger UI** available at `/docs` endpoint
* AI usage logged in `docs/ai-usage.md` (≥ 6 prompts)
* Git commit history screenshot in `docs/commits.md`
* Demo video link in `docs/video.md`
* Gemini integration guide in `docs/ai-integration.md`

## 11. System Diagram
```
[Frontend: Vite+React]
        |
        v
[Backend: Express API]
        |
        └─→ [MongoDB Atlas]

[Frontend Chatbot] ──→ [Google Gemini API]
        (client-side)
```

## 12. AI Integration Architecture (Frontend-only)
```
User (in app)
     ↓
Frontend Chatbot (context from UI)
     ↓
Google Gemini API (client key)
     ↓
Response rendered in UI
```
