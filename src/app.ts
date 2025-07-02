import express from 'express';
import * as dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes';
import horoscopeRoutes from './routes/HoroscsopeRoutes';
import mongoose from 'mongoose';
import { swaggerSpec } from './docs/Swagger';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/horoscope', horoscopeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
};
