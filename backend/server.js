import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './src/routes/auth.js';
import itemRoutes from './src/routes/items.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser(process.env.SESSION_SECRET || 'dev_secret'));

// static serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'KLH Lost & Found API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

async function start() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI not set');
    process.exit(1);
  }

  await mongoose.connect(mongoUri, { dbName: 'web' });
  console.log('Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});


