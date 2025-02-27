import express from "express";
import cors from "cors"
import authRoutes from './Routes/auth.routes.js'

const app = express();

app.use(cors());

app.use('/user', authRoutes)

app.listen(4000, () => console.log('Server is running on PORT: 4000'))