## 🖹 Typify1 – Typing Speed Test App

A **full-stack Typing Speed Test** web application built with **React (frontend)** and **Node.js + Express + MongoDB (backend)**.

This project is organized under a `miniproject` folder that separates frontend and backend codebases for better modularity.

---

### 🚀 Features

* Typing test with real-time feedback
* Accuracy and speed tracking
* Frontend built with React
* Backend API with Express and MongoDB
* Clear folder separation for frontend and backend

---

### 📁 Folder Structure

```
Typify1/
└── miniproject/
    ├── frontend/           # React app
    │   ├── public/
    │   ├── src/
    │   └── package.json
    │
    └── backend/            # Node.js + Express + MongoDB backend
        ├── models/
        ├── routes/
        ├── server.js
        └── package.json
```

---

### 📦 Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/Typify1.git
cd Typify1/miniproject
```

#### 2. Install dependencies

**Frontend:**

```bash
cd frontend
npm install
```

**Backend:**

```bash
cd ../backend
npm install
```

---

### 🧑‍💻 Running the App

**Start the Backend Server:**

```bash
cd backend
npm start
```

**Start the Frontend Dev Server:**

```bash
cd ../frontend
npm start
```

Then go to `http://localhost:3000` in your browser.

---

### 🔧 Technologies Used

* **Frontend:** React, Axios
* **Backend:** Node.js, Express
* **Database:** MongoDB (via Mongoose)
* **Middleware:** Cookie-parser

---

### ✅ To Do

* Authentication and user profiles
* Leaderboard to track best typing scores
* Add difficulty levels or word sets
* Deploy to Render / Vercel / Railway

---

### 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

