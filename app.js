import express from 'express';
import dotenv from 'dotenv';
import { authRoutes, errorHandler, connectToDatabase, seedAdmin} from './index.js';

dotenv.config();

const app = express();

await connectToDatabase();
await seedAdmin();

app.use(express.json());
app.use('/api', authRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
  }); 