import express from "express";
import cors from "cors"
import authRoutes from './Routes/auth.routes.js'

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://my-bank-1234.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use('/user', authRoutes)

app.listen(4000, () => console.log('Server is running on PORT: 4000'))