# KLH Lost & Found - Render Deployment Guide

## 🚀 Deployment on Render

This guide will help you deploy the KLH Lost & Found application on Render.

### 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Push your code to GitHub
3. **MongoDB Atlas Account**: For production database

### 🔧 Environment Variables

#### Backend Service Environment Variables:

```bash
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://kannanrushi05_db_user:V9HCHCbKVRB14uEq@cluster0.p2iuqpr.mongodb.net/web?retryWrites=true&w=majority&appName=Cluster0
SESSION_SECRET=your-secret-key-here
CLIENT_ORIGIN=https://lostandfound-frontend.onrender.com
```

#### Frontend Service Environment Variables:

```bash
VITE_API_BASE=https://lostandfound-backend.onrender.com
```

### 🗄️ Database Setup

#### Option 1: MongoDB Atlas (Recommended)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGO_URI` environment variable

#### Option 2: Render PostgreSQL (Alternative)
1. Create a PostgreSQL database on Render
2. Update connection string in backend

### 📁 Deployment Steps

#### 1. Backend Service
1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `lostandfound-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

#### 2. Frontend Service
1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `lostandfound-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Plan**: Free

#### 3. Environment Variables Setup
1. Go to each service's settings
2. Add the environment variables listed above
3. Make sure to update URLs with your actual Render URLs

### 🔗 Service Dependencies

The frontend service depends on the backend service. Make sure to:
1. Deploy backend first
2. Get the backend URL from Render
3. Update frontend's `VITE_API_BASE` environment variable
4. Redeploy frontend

### 📊 Database Configuration

The application will automatically:
1. Try to connect to MongoDB Atlas
2. Fall back to in-memory database if MongoDB fails
3. Use in-memory database for development

### 🧪 Testing Deployment

1. **Backend Health Check**: Visit `https://your-backend-url.onrender.com`
2. **Frontend**: Visit `https://your-frontend-url.onrender.com`
3. **Signup**: Test user registration
4. **Login**: Test user authentication
5. **Post Item**: Test item creation
6. **Claim Item**: Test item claiming

### 🛠️ Troubleshooting

#### Common Issues:

1. **CORS Errors**: 
   - Check `CLIENT_ORIGIN` environment variable
   - Ensure frontend URL is correct

2. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check network access settings

3. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Environment Variables**:
   - Ensure all required variables are set
   - Check for typos in variable names

### 📝 Production Checklist

- [ ] Backend service deployed and running
- [ ] Frontend service deployed and running
- [ ] Environment variables configured
- [ ] Database connection working
- [ ] CORS properly configured
- [ ] SSL certificates active
- [ ] Domain configured (if using custom domain)

### 🔄 Updates and Maintenance

1. **Code Updates**: Push to GitHub, Render auto-deploys
2. **Environment Changes**: Update in Render dashboard
3. **Database Backups**: Configure MongoDB Atlas backups
4. **Monitoring**: Use Render's built-in monitoring

### 📞 Support

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Application Issues**: Check application logs in Render dashboard

---

## 🎯 Quick Start Commands

```bash
# Clone and setup
git clone <your-repo-url>
cd Lostandfound

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Test locally
cd backend && npm run dev
cd frontend && npm run dev

# Build for production
cd frontend && npm run build
```

Your application will be available at:
- **Backend**: `https://lostandfound-backend.onrender.com`
- **Frontend**: `https://lostandfound-frontend.onrender.com`
