# BookStore — MERN Course Platform

BookStore is a full-stack **MERN** (MongoDB, Express, React, Node.js) web app. Despite the name, it's actually an **online learning platform**: students can browse free and paid programming courses, sign up with OTP email verification, log in, add courses to a cart, "purchase" (enroll in) them, and practice with quizzes in a dedicated Training section.

## ✨ Features

- **Browse courses** — Free and paid courses (React, Node.js, MongoDB, Python, Java, etc.), pulled from MongoDB.
- **Signup with OTP verification** — Email OTP sent via Nodemailer/Gmail before account creation.
- **Login / Logout** — Session persisted in `localStorage`.
- **Shopping cart** — Click **Buy Now** on any course to add it to your cart (login required).
- **Checkout & Enroll** — On checkout, cart items become "enrolled courses."
- **Training / Practice section** — Enrolled students can open any of their courses and answer a short practice quiz.
- **Contact form** — Stores visitor messages in MongoDB.
- **Dark mode** — Toggle via the navbar, persisted in `localStorage`.
- **Responsive UI** — Tailwind CSS + DaisyUI, carousel via `react-slick`.

## 🏗️ Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 18, Vite, React Router, Tailwind CSS, DaisyUI, Axios, React Hook Form, React Hot Toast, React Slick |
| Backend   | Node.js, Express, Mongoose (MongoDB) |
| Auth      | bcryptjs (password hashing), OTP email verification via Nodemailer |
| Database  | MongoDB (Atlas) |

## 📁 Project Structure

```
BookStore/
├── Backend/
│   ├── config/
│   │   └── mailer.js          # Nodemailer transporter (Gmail)
│   ├── controller/
│   │   ├── book.controller.js # Get all courses
│   │   ├── contact.controller.js
│   │   ├── user.controller.js # Signup (OTP), Login
│   │   ├── cart.controller.js      # NEW — cart CRUD, scoped per user
│   │   └── enrollment.controller.js # NEW — checkout + progress tracking
│   ├── model/
│   │   ├── book.model.js      # Course schema
│   │   ├── user.model.js
│   │   ├── otp.model.js
│   │   ├── contact.model.js
│   │   ├── cart.model.js       # NEW — { userId, courseId }
│   │   └── enrollment.model.js # NEW — { userId, courseId, progress }
│   ├── route/
│   │   ├── book.route.js      # GET /book
│   │   ├── user.route.js      # POST /user/send-otp, /signup, /login
│   │   ├── contact.route.js   # POST /contact
│   │   ├── cart.route.js       # NEW — /cart
│   │   └── enrollment.route.js # NEW — /enrollment
│   ├── seed.js                 # Seeds sample courses into MongoDB
│   └── index.js                # Express app entry point
│
└── Frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx, Footer.jsx, Banner.jsx
        │   ├── Login.jsx, Signup.jsx, Logout.jsx
        │   ├── Course.jsx, Cards.jsx, Freebook.jsx
        │   ├── Cart.jsx         # NEW — view/manage cart, checkout
        │   ├── Training.jsx     # NEW — practice quizzes for enrolled courses
        │   └── Contact.jsx
        ├── context/
        │   ├── AuthProvider.jsx
        │   ├── CartProvider.jsx   # NEW — cart state, synced with /cart API
        │   └── EnrollProvider.jsx # NEW — enrollment state, synced with /enrollment API
        ├── courses/Courses.jsx
        ├── home/Home.jsx
        ├── App.jsx
        └── main.jsx
```

## ⚙️ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=4001
MongoDBURI="your-mongodb-connection-string"
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password
```

(Optional) seed the database with sample courses:

```bash
node seed.js
```

Start the server:

```bash
npm start
```

The API runs on `http://localhost:4001` by default, exposing:

| Method | Endpoint                        | Description                              |
|--------|-----------------------------------|-------------------------------------------|
| GET    | `/book`                         | List all courses                          |
| POST   | `/user/send-otp`                | Send signup OTP to an email               |
| POST   | `/user/signup`                  | Create account (OTP required)             |
| POST   | `/user/login`                   | Log in                                    |
| POST   | `/contact`                      | Submit a contact message                  |
| GET    | `/cart/:userId`                 | Get a user's cart (populated with course details) |
| POST   | `/cart`                         | Add a course to a user's cart — body: `{ userId, courseId }` |
| DELETE | `/cart/:userId/:courseId`       | Remove one course from a user's cart      |
| DELETE | `/cart/:userId`                 | Clear a user's entire cart                |
| GET    | `/enrollment/:userId`           | Get a user's enrolled courses (with progress) |
| POST   | `/enrollment/checkout`          | Move everything in a user's cart into their enrollments — body: `{ userId }` |
| PATCH  | `/enrollment/:userId/:courseId` | Update progress on an enrolled course — body: `{ progress }` |

## 💻 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default (Vite). Make sure the backend is running on port `4001`, since the frontend calls `http://localhost:4001` directly (see `Course.jsx`, `Freebook.jsx`, `Login.jsx`, `Signup.jsx`).

## 🛒 Cart & Training (new features)

Cart and enrollment data is now **persisted in MongoDB per user** (not just `localStorage`), via two new collections/APIs — `Cart` and `Enrollment`.

**How it works:**

1. **Add to cart** — Every course card's *Buy Now* button calls `addToCart()` from `CartProvider`, which sends `POST /cart` with the logged-in user's `_id` and the course's `_id`. Logged-out users are prompted to log in first; a course already in the cart shows **"In Cart ✓"** instead. The cart is refetched from the backend (`GET /cart/:userId`) whenever the logged-in user changes, so it's the same across devices/sessions.
2. **View cart** — The navbar's **Cart** link (with a live item-count badge) opens `/cart`, listing each course with a remove option (`DELETE /cart/:userId/:courseId`) and running total.
3. **Checkout** — Clicking **Checkout & Enroll** calls `POST /enrollment/checkout`, which — server-side, in a single request — moves every course in that user's cart into the `Enrollment` collection and empties their cart. No local-only state is trusted here; the server is the source of truth.
4. **Training section** — The navbar's new **Training** link (`/training`) fetches `GET /enrollment/:userId` and lists all enrolled courses. Clicking **Start Practice** on a course opens a short multiple-choice quiz and shows a score at the end.

Each `Enrollment` document also has a `progress` field (0–100) with a ready-to-use `PATCH /enrollment/:userId/:courseId` endpoint and `updateProgress()` helper in `EnrollProvider` — the UI for showing/editing progress bars isn't wired up yet, but the plumbing is there.

## 🚀 Next Steps / Ideas to Extend This

- Integrate a real payment gateway (Stripe/Razorpay) for the "Checkout" step — right now checkout just moves cart → enrollment with no payment.
- Add a progress bar / "mark lesson complete" UI in the Training page, wired to the existing `PATCH /enrollment/:userId/:courseId` endpoint.
- Move the static practice question bank in `Training.jsx` into MongoDB, with a `GET /practice/:courseId` endpoint, so admins can add questions without redeploying the frontend.
- Add JWT-based auth (with an `Authorization` header) instead of trusting a raw `userId` in the URL/body — right now any client could pass another user's `userId` since there's no token verification.
- Add indexes/cleanup: e.g. a MongoDB TTL index on the `Otp` collection so expired OTPs are auto-deleted instead of just filtered out in code.

## 📄 License

ISC (see `Backend/package.json`).
