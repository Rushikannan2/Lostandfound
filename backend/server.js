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
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration for production and development
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? [CLIENT_ORIGIN] 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'http://localhost:5179'],
  credentials: true 
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser(process.env.SESSION_SECRET || 'dev_secret'));

// static serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from frontend build in production
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// API routes
app.get('/api', (req, res) => {
  res.json({ status: 'ok', service: 'KLH Lost & Found API' });
});

// Serve frontend for all non-API routes in production
if (NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Simple in-memory storage for demo
const memoryDB = {
  users: [],
  items: []
};

// Mock mongoose models for demo
const mockUser = {
  findOne: async (query) => {
    return memoryDB.users.find(u => u.email === query.email) || null;
  },
  create: async (data) => {
    const user = { 
      _id: Date.now().toString(), 
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryDB.users.push(user);
    return user;
  },
  save: async function() {
    // For existing users, update in memory
    const index = memoryDB.users.findIndex(u => u._id === this._id);
    if (index !== -1) {
      memoryDB.users[index] = { ...this, updatedAt: new Date() };
    }
    return this;
  }
};

const mockItem = {
  find: async () => {
    return {
      populate: () => Promise.resolve(memoryDB.items.map(item => ({
        ...item,
        postedBy: memoryDB.users.find(u => u._id === item.postedBy) || { name: 'Unknown', email: 'unknown@klh.edu.in' },
        claimedBy: item.claimedBy ? memoryDB.users.find(u => u._id === item.claimedBy) : null
      })))
    };
  },
  create: async (data) => {
    const item = { _id: Date.now().toString(), ...data };
    memoryDB.items.push(item);
    return item;
  },
  findById: async (id) => {
    return memoryDB.items.find(item => item._id === id) || null;
  }
};

async function start() {
  const mongoUri = process.env.MONGO_URI || 'mongodb+srv://kannanrushi05_db_user:V9HCHCbKVRB14uEq@cluster0.p2iuqpr.mongodb.net/web?retryWrites=true&w=majority&appName=Cluster0';
  
  // In production, always try to connect to MongoDB
  if (NODE_ENV === 'production') {
    try {
      await mongoose.connect(mongoUri);
      console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      console.log('🔄 Falling back to in-memory database...');
      
      // Override the models for demo
      const User = await import('./src/models/User.js');
      const Item = await import('./src/models/Item.js');

      User.default.findOne = mockUser.findOne;
      User.default.create = mockUser.create;
      User.default.prototype.save = mockUser.save;
      Item.default.find = mockItem.find;
      Item.default.create = mockItem.create;
      Item.default.findById = mockItem.findById;
    }
  } else {
    // In development, try MongoDB but fallback to in-memory
    try {
      await mongoose.connect(mongoUri);
      console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      console.log('🔄 Falling back to in-memory database...');
      
      // Override the models for demo
      const User = await import('./src/models/User.js');
      const Item = await import('./src/models/Item.js');

      User.default.findOne = mockUser.findOne;
      User.default.create = mockUser.create;
      User.default.prototype.save = mockUser.save;
      Item.default.find = mockItem.find;
      Item.default.create = mockItem.create;
      Item.default.findById = mockItem.findById;
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`🌐 Environment: ${NODE_ENV}`);
    console.log(`🌐 CORS Origin: ${CLIENT_ORIGIN}`);
    console.log('📊 Database: MongoDB Atlas (with fallback)');
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});


