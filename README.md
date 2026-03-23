# 🔗 URL Shortener with Analytics (In progress)

A backend-heavy URL shortening service built with the MERN stack. Paste a long URL, get a short one. Every click is tracked — device, timestamp, location. Think mini Bitly.

## 🚀 Features

- Shorten any URL to a clean short code (e.g. `localhost:3000/abc123`)
- Redirect users instantly when they visit the short URL
- Track every click — timestamp, IP address, device type
- Analytics dashboard showing total clicks, recent visits, and top URLs
- Expiry support — URLs can be set to expire after N days
- Custom aliases — choose your own short code instead of a random one

## 🛠️ Tech Stack

**Backend (main focus)**
- Node.js + Express — REST API and redirect logic
- MongoDB + Mongoose — storing URLs, clicks, and analytics
- nanoid — generating unique short codes

**Frontend (minimal)**
- React — simple input form + analytics dashboard
- Axios — calling the backend API

---

## 📁 Project Structure

```
url-shortener/
├── server/
│   ├── index.js              # Entry point, Express app setup
│   ├── models/
│   │   ├── Url.js            # URL schema (longUrl, shortCode, expiry, createdAt)
│   │   └── Click.js          # Click schema (urlId, ip, device, timestamp)
│   ├── routes/
│   │   └── url.js            # POST /shorten, GET /:code, GET /analytics/:code
│   └── middleware/
│       └── trackClick.js     # Middleware to log click data before redirect
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── ShortenForm.jsx
│   │   │   └── AnalyticsDashboard.jsx
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file inside `/server`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:3000
```

### Run the App

```bash
# Start backend
cd server
node index.js

# Start frontend (separate terminal)
cd client
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/shorten` | Create a short URL |
| GET | `/:code` | Redirect to original URL + log click |
| GET | `/api/analytics/:code` | Get click stats for a short URL |

### Example Request

```bash
POST /api/shorten
Content-Type: application/json

{
  "longUrl": "https://www.google.com",
  "customAlias": "google",   # optional
  "expiresIn": 7             # optional, days
}
```

### Example Response

```json
{
  "shortUrl": "http://localhost:3000/google",
  "shortCode": "google",
  "longUrl": "https://www.google.com",
  "expiresAt": "2025-04-01T00:00:00.000Z"
}
```

---

## 📊 What I Learned Building This

- Designing REST APIs with Express from scratch
- Modeling data in MongoDB using Mongoose schemas and relationships
- Writing middleware to intercept requests (click tracking before redirect)
- Aggregating data in MongoDB (`$group`, `$count`) for analytics
- Handling async/await and error handling in Node.js
- Connecting a React frontend to a Node.js backend via Axios


## 🔮 Possible Extensions

- User accounts — each user manages their own URLs
- QR code generation for each short URL
- Rate limiting to prevent abuse
- Deploy to Railway / Render + MongoDB Atlas

---

## 📄 License

MIT
