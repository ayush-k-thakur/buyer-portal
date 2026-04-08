# TechKraft Fullstack Junior App

A simple fullstack property listing app with authentication, favourites, and basic CRUD operations.

## How to run the app

### Backend
1. Open a terminal and go to `backend`
   ```bash
   cd backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file with at least:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server
   ```bash
   npm run dev
   ```
5. The backend will run on `http://localhost:5000`

### Frontend
1. Open another terminal and go to `frontend`
   ```bash
   cd frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the frontend
   ```bash
   npm run dev
   ```
4. The frontend will run on `http://localhost:5173`

## Example flows

### Sign up → Login → Add favourite
1. Register a new user from the signup page.
2. The backend hashes the password with `bcryptjs` and stores only the hash.
3. After registration, the app logs in automatically using a JWT cookie.
4. Browse properties in the dashboard.
5. Click the favourite button to toggle a property in your favourites list.
6. View favourites in the favourites tab.

### Seller flow: add property → my listings
1. Register or log in as a user with role `seller`.
2. Use the add property form to create a new listing.
3. The backend stores the property with `createdBy` referencing the seller.
4. View your listings under the "My Listings" section.
5. Delete a property if you are the owner or an admin.

## What this project demonstrates

- Authentication and authorization
  - JWT-based auth with HTTP-only cookies
  - Protected routes with middleware
  - No raw passwords stored in the database
- Database design
  - `User` model with `name`, `email`, `password`, `role`, and `favourites`
  - `Property` model with `name`, `price`, `location`, `description`, and `createdBy`
- CRUD operations
  - list properties, view details, create a property, delete a property
  - toggle favourites for authenticated users
- Clear frontend/backend separation
  - `frontend/` contains React + Vite UI code
  - `backend/` contains Express + MongoDB API code
- Basic UX thinking
  - toast messages for success/error feedback
  - loading skeletons while data is fetched
  - tabbed dashboard for browsing and favourites

## Notes

- The backend uses `cors` with credentials enabled so the frontend can send cookies.
- For local development, make sure the `cors` origin in the backend matches your frontend URL (for example `http://localhost:5173`).
- If you change the frontend port or host, update the backend CORS origin and any frontend API base URL settings accordingly.
- The frontend fetches data from `http://localhost:5000` and expects the backend to set the auth cookie.
- Make sure `JWT_SECRET` is set in the backend environment before starting the server.
