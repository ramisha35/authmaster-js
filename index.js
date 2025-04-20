import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/globalErrorHandling.js';
import { connectToDatabase } from './config/database.js';

dotenv.config();

const app = express();

await connectToDatabase();


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
  }); 