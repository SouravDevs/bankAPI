import express from "express";
import cors from "cors"
import authRoutes from './Routes/auth.routes.js'

const app = express();

app.use(cors({
    
        origin: "http://localhost:5173", // Specify your frontend URL
        credentials: true, // Allow cookies and authentication headers
      })
);

app.use('/user', authRoutes)

app.listen(4000, () => console.log('Server is running on PORT: 4000'))