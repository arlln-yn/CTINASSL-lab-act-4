import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Content Security Policy (CSP) Header Not Set
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Allow only same-origin content
      scriptSrc: ["'self'", "'unsafe-inline'"], // Allow scripts from the same origin
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow styles from the same origin
      frameAncestors: ["'none'"], // Prevent embedding in iframes (anti-clickjacking)
    }
  }
}));

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.removeHeader('Server');
  next();
});

// CORS Middleware Configuration
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins, // Allow only localhost:5173
    credentials: true, // Allow cookies and authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));


app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY'); // Prevent clickjacking
    next();
  });

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "frame-ancestors 'none'"); // Disallows embedding in any frame
    next();
  });

app.use((req, res, next) => {
    delete req.headers['x-forwarded-for']; // Remove forwarded IPs
    next();
  });

// Middleware to set X-Content-Type-Options header
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

  
// Middleware
app.use(express.json()); // Allows JSON data in the request body
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});
