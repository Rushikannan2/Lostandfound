# KLH Lost & Found - Render Deployment Guide

## 🚀 Deployment on Render

This guide will help you deploy the KLH Lost & Found application on Render.

### 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Push your code to GitHub
3. **MongoDB Atlas Account**: For production database

### 🔧 Environment Variables

#### Application Environment Variables:

```bash
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://kannanrushi05_db_user:V9HCHCbKVRB14uEq@cluster0.p2iuqpr.mongodb.net/web?retryWrites=true&w=majority&appName=Cluster0
SESSION_SECRET=your-secret-key-here
CLIENT_ORIGIN=https://lostandfound-app.onrender.com
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

#### Single Service Deployment
1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `lostandfound-app`
   - **Environment**: `Node`
   - **Build Command**: 
     ```bash
     cd backend && npm install
     cd ../frontend && npm install && npm run build
     ```
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

#### Environment Variables Setup
1. Go to service settings
2. Add the environment variables listed above
3. The application will serve both API and frontend from the same domain

### 🔗 Single Service Benefits

With the single service deployment:
1. **Simpler Setup**: Only one service to configure
2. **Same Domain**: No CORS issues between frontend and backend
3. **Cost Effective**: Only one Render service to pay for
4. **Easier Management**: Single deployment, single URL

### 📊 Database Configuration

The application will automatically:
1. Try to connect to MongoDB Atlas
2. Fall back to in-memory database if MongoDB fails
3. Use in-memory database for development

### 🧪 Testing Deployment

1. **Application**: Visit `https://lostandfound-app.onrender.com`
2. **API Health Check**: Visit `https://lostandfound-app.onrender.com/api`
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
- **Full Application**: `https://lostandfound-app.onrender.com`
- **API Endpoint**: `https://lostandfound-app.onrender.com/api`
