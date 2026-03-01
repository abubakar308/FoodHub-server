# 🍽️ FoodHub Backend API

Backend service for the **FoodHub Meal Marketplace** platform.  
This API powers authentication, meals management, orders, providers, and admin controls.

🔗 **Live Server:** https://food-hub-server-five.vercel.app

---

# 🚀 Features

✔ JWT Authentication & Role-based Authorization  
✔ Provider meal management (CRUD)  
✔ Order system with status handling  
✔ Admin controls for users & meals  
✔ Secure API with middleware validation  
✔ Pagination, filtering & searching support  
✔ Error handling & response formatting  

---

# 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL / MongoDB** *(use your actual DB here)*
- **Prisma** *(use your actual ORM here)*
- **JWT Authentication**
- **Zod / Validator Middleware**
- **Vercel Deployment**

---

# 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/foodhub-server.git
cd foodhub-server
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 4️⃣ Run development server

```bash
npm run dev
```

### 5️⃣ Build for production

```bash
npm run build
npm start
```

---

# 🔐 Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
POST | `/api/auth/register` | Register user  
POST | `/api/auth/login` | Login user  
GET | `/api/auth/me` | Get logged-in user  

---

# 🍱 Meal Routes

| Method | Endpoint | Access |
|--------|----------|--------|
GET | `/api/meals` | Public  
GET | `/api/meals/:id` | Public  
POST | `/api/meals` | Provider  
PATCH | `/api/meals/:id` | Provider (Own Meal)  
DELETE | `/api/meals/:id` | Provider/Admin  

---

# 🛒 Order Routes

| Method | Endpoint | Access |
|--------|----------|--------|
POST | `/api/orders` | User  
GET | `/api/orders/my-orders` | User  
GET | `/api/orders` | Admin  
PATCH | `/api/orders/:id/status` | Admin/Provider  

---

# 👨‍🍳 Provider Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
GET | `/api/providers/meals` | Get provider own meals  
GET | `/api/providers/dashboard` | Provider stats  

---

# 👑 Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
GET | `/api/users` | All users  
PATCH | `/api/users/role/:id` | Change role  
DELETE | `/api/meals/:id` | Remove any meal  

---

# ⚙️ API Response Format

### ✅ Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

### ❌ Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": {}
}
```

---

# 🧪 Testing API

You can test endpoints using:

- Postman
- Thunder Client
- Insomnia

Base URL:

```
https://food-hub-server-five.vercel.app/api
```

---

# 🌍 Deployment

This backend is deployed on **Vercel Serverless Functions**.

To deploy:

```bash
vercel --prod
```

---

# 📄 License

This project is licensed under the **MIT License**

---

# 👨‍💻 Author

**Md Abu Bakar Siddique**  
Full Stack Developer (MERN)

- Portfolio: *(add link)*
- LinkedIn: *(add link)*

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub  
and feel free to contribute!