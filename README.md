KLH Lost & Found (MERN)

Setup
- Backend
  - Copy backend/.env.example to backend/.env and fill values
  - Set MONGO_URI using provided connection string
  - Run: cd backend && npm install && npm run dev
- Frontend
  - Copy frontend/.env.example to frontend/.env
  - Run: cd frontend && npm install && npm run dev

Simple Auth
- Login with name+email; only emails ending with @klh.edu.in are allowed
- No JWT; server sets a signed cookie named "user"

API
- POST /api/auth/login { name, email }
- POST /api/auth/logout
- GET /api/auth/me
- GET /api/items
- POST /api/items (multipart form fields: title, description, location, status, image)
- POST /api/items/:id/claim

Images
- Stored in backend/uploads and served from /uploads/...
  - Alternatively configure Cloudinary in backend env


