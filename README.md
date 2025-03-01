# Refer & Earn Project

## Project Setup
This is a MERN stack (MongoDB, Express.js, React.js, Node.js) project that allows users to refer friends and earn rewards.

---

## 🚀 Running the Project

### 1️⃣ Frontend Setup
```sh
cd frontend
npm install
npm run dev
```
This will start the frontend React app.

### 2️⃣ Backend Setup
```sh
cd backend
npm install
npm run dev
```
This will start the backend Express server.

---

## 📌 API Endpoint
### Referral Submission
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/referrals`
- **Payload:**
```json
{
  "referrerName": "John Doe",
  "referrerEmail": "john@example.com",
  "refereeName": "Jane Smith",
  "refereeEmail": "jane@example.com",
  "courseName": "Web Development",
  "message": "Great course!"
}
```
- **Response:**
```json
{
  "message": "Referral submitted successfully!",
  "referral": { ... }
}
```

---

## 🎯 Features
- Users can refer friends using a form.
- Referrals are stored in a database using Prisma & MySQL.
- Frontend is built with React and Material UI.
- Backend is built with Express and Node.js.

---

## 📂 Project Structure
```
/refer-earn-project
├── frontend/  # React app
├── backend/   # Node.js & Express API
├── prisma/    # Database schema & migrations
├── README.md  # Project documentation
```

Happy Coding! 🚀

