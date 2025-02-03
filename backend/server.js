import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows to accept json data to body
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/', authRoutes);
app.use("/api/products", productRoutes);





app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});

