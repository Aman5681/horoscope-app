# Horoscope API (TypeScript + Node.js + MongoDB)

A RESTful API built with TypeScript, Express, and MongoDB that provides daily and historical horoscope data for users based on their zodiac sign. It includes JWT-based authentication and Swagger API documentation.

This backend web service is hosted on Render
https://horoscope-app-x0ie.onrender.com

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js >= 18
- MongoDB Atlas (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/horoscope-api
cd horoscope-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/horoscope?retryWrites=true&w=majority
JWT_SECRET=supersecret
```

### 4. Run the app
```bash
npm run build     # Compile TypeScript
npm start         # Start compiled server
```

### 5. API Documentation
Visit Swagger UI:
```
http://localhost:3000/api-docs
```

---

## 🧪 Postman Collection

### 🔗 How to Use
1. Import the collection: `Horoscope_API.postman_collection.json`
2. Import the environment: `Horoscope_Env.postman_environment.json`
3. Collections are present in postman-collections folder
3. Make sure `Horoscope Env` is selected as the active environment.
4. Use the requests in this order:
   - `POST /auth/signup`
   - `POST /auth/login` → stores JWT token in `auth_token`
   - `GET /horoscope/today` → uses `{{auth_token}}`
   - `GET /horoscope/history` → uses `{{auth_token}}`

### 🔐 Authorization
Token is auto-stored after login/signup and reused in headers:
```
Authorization: Bearer {{auth_token}}
```

---

## 📐 Design Decisions

- **Singleton Pattern** for services ensures controlled instantiation.
- **Class-based Controllers** for better structure and testability.
- **Inversion of Control** applied to isolate business logic.
- **Rate Limiting & JWT Middleware** used to protect endpoints.
- **Swagger** for live documentation and testing.

---

## 🔧 Improvements With More Time

- Add **unit & integration tests** (Jest/Supertest).
- Use **tsyringe** or **InversifyJS** for advanced dependency injection.
- Add **refresh token** flow and role-based auth.
- Store horoscopes in DB and use a CMS or AI for dynamic content.
- Enable caching with Redis for frequently accessed horoscope data.

---

## 📫 Author
Made with 💫 by Aman Gandhi
