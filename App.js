import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes.js';
import { errorHandler } from './Middlewares/GlobalErrorHandling.js';
import { connectToDatabase } from './Configurations/Database.js';

dotenv.config();

const app = express();

await connectToDatabase();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
  }); 