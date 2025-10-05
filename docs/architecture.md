# Shipsy Assignment – System Architecture

## 1. Overview
This application is a **Shipment Management System** built to fulfill the Shipsy assignment requirements. It has:
* **Authentication** (JWT-based login)
* **CRUD** for a `Shipment` entity (text, enum, boolean, calculated field)
* **Pagination, filtering, search, sorting**
* **Protected API** and **Protected frontend routes**
* **Swagger API documentation**
* **AI Integration** with Google Gemini for intelligent shipment insights

## 2. Tech Stack
### Frontend
* Vite + React (JavaScript)
* Tailwind CSS for styling
* React Router for client-side routing
* React Query for server state management and caching
* Google Gemini API for AI-powered features

### Backend
* Node.js + Express.js
* MongoDB (Atlas) + Mongoose ORM
* JWT for authentication
* bcrypt for password hashing
* swagger-ui-express + YAML for API docs
* Google Gemini API integration

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
### Frontend (`apps/frontend/`)
* `Public/` - logo and Mp4
* `src/config/` - exports VITE_SERVER_URL and Gemini API configuration
* `src/components/` – 
  * AllShipments, MyShipments, ShipmentTables, ShipmentActions, Create/Delete/Edit Shipment
  * Landing and Dashboard Section with Login and Signup
  * Pagination
  * ProtectedRoutes
  * **AI Components:**
    * ShipmentInsights - AI-powered analytics and recommendations
    * GeminiChat - Interactive chat interface for shipment queries
    * SmartSuggestions - Intelligent shipment optimization suggestions

### Backend (`apps/backend/`)
* `config/db.js` – Connects to MongoDB
* `config/gemini.js` – Gemini API configuration and initialization
* `middleware/auth.js` – JWT validation
* `models/`
  * `User.js` – User Schema
  * `Shipment.js` – Shipment schema
* `routes/`
  * `Auth.js` – Login, Signup and fetch User with token
  * `shipment.js` – CRUD operation on Shipment Schema
  * `ai.js` – Gemini AI integration endpoints
* `services/`
  * `geminiService.js` – Handles Gemini API interactions
* `index.js` – Starts server

## 5. API Endpoints
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
| `/ai/analyze` | POST | Analyze shipment data with Gemini |
| `/ai/suggest` | POST | Get AI-powered optimization suggestions |
| `/ai/chat` | POST | Interactive chat with Gemini about shipments |
| `/ai/insights` | GET | Get AI-generated insights for user's shipments |

## 6. Data Flow
### Login Flow:
1. User logs in via frontend `/login` → POST `/auth/login`
2. Backend verifies credentials → returns JWT
3. Frontend stores JWT in `localStorage`
4. All future API requests include `Authorization: Bearer <token>`

### CRUD Flow (example Create):
1. User fills shipment form → frontend sends POST `/shipments`
2. Backend calculates `cost` server-side and saves to MongoDB
3. Returns created shipment → React Query updates cache → UI updates

### AI Integration Flow:
1. User requests AI insights/suggestions → frontend sends request to `/ai/*` endpoint
2. Backend gathers relevant shipment data from MongoDB
3. Backend sends structured prompt to Gemini API with shipment context
4. Gemini processes data and returns insights/suggestions/answers
5. Backend formats response → frontend displays AI-generated content
6. React Query caches AI responses for performance

## 7. Gemini AI Features
### Implemented AI Capabilities:
* **Shipment Analysis**: Analyze patterns, costs, and efficiency across all shipments
* **Smart Suggestions**: Get recommendations for route optimization and cost reduction
* **Predictive Insights**: Forecast delivery times and identify potential delays
* **Interactive Chat**: Ask natural language questions about shipments
* **Anomaly Detection**: Identify unusual patterns or potential issues
* **Cost Optimization**: Suggestions for reducing shipping costs based on historical data

### Gemini API Integration:
* Model: `gemini-2.0-flash-exp`
* Authentication: API key stored in environment variables
* Rate limiting: Implemented to prevent API quota exhaustion
* Error handling: Graceful fallbacks when AI service is unavailable
* Caching: AI responses cached to reduce API calls

## 8. Deployment Architecture
### Frontend
* Built with Vite → Deployed to **Vercel**
* Environment variables:
  * `VITE_SERVER_URL` points to backend URL
  * `VITE_GEMINI_API_KEY` for client-side AI features (optional)

### Backend
* Node.js + Express → Deployed to **Render**
* Connected to **MongoDB Atlas**
* Environment variables:
  * `MONGODB_URI`
  * `JWT_SECRET`
  * `PORT`
  * `GEMINI_API_KEY`

## 9. Security
* JWT for route protection
* Passwords stored as bcrypt hashes
* Pagination limits to prevent large query abuse
* Gemini API key secured in environment variables
* AI endpoints protected with JWT authentication
* Input sanitization for AI prompts to prevent injection attacks

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
        ├─→ [React Query Cache]
        |
        v
[Backend: Express API] ──→ [Swagger UI /docs]
        |
        ├─→ [MongoDB Atlas]
        |
        └─→ [Google Gemini API]
                |
                └─→ AI Services:
                    - Analysis
                    - Suggestions
                    - Chat
                    - Insights
```

## 12. AI Integration Architecture
```
User Request
     ↓
Protected Route (JWT)
     ↓
AI Controller
     ↓
Gemini Service
     ↓
     ├─→ Fetch Shipment Data (MongoDB)
     ├─→ Format Prompt with Context
     ├─→ Call Gemini API
     └─→ Process & Format Response
     ↓
Cache Response (React Query)
     ↓
Return to Frontend
```
