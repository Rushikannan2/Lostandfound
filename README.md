# 🎓 KLH Lost & Found Platform

A comprehensive Lost & Found platform designed specifically for KLH students, built with the MERN stack.

## 🌟 Features

- **Student Authentication**: KLH email domain validation
- **User Registration**: Complete student profile with roll number and department
- **Lost Item Posting**: Upload images, descriptions, and location details
- **Found Item Management**: Track and claim found items
- **Real-time Updates**: Live dashboard with all items
- **Mobile Responsive**: Works on all devices

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd Lostandfound

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start development servers
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Production Deployment

```bash
# Test deployment configuration
node test-deployment.js

# Deploy to Render
# 1. Push to GitHub
# 2. Connect to Render
# 3. Deploy backend first
# 4. Deploy frontend second
```

## 📁 Project Structure

```
Lostandfound/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   └── middleware/      # Authentication
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── pages/         # React components
│   │   ├── api.ts         # API client
│   │   └── main.tsx       # App entry point
│   └── package.json
├── render.yaml            # Render deployment config
├── DEPLOYMENT.md          # Deployment guide
└── README.md             # This file
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with in-memory fallback)
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Navigation

## 🔧 Environment Variables

### Backend
```bash
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...
SESSION_SECRET=your-secret-key
CLIENT_ORIGIN=https://your-frontend-url.com
```

### Frontend
```bash
VITE_API_BASE=https://your-backend-url.com
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Items
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `POST /api/items/:id/claim` - Claim an item

## 🎯 User Flow

1. **Registration**: Students sign up with KLH email
2. **Login**: Access the platform
3. **Dashboard**: View all lost/found items
4. **Post Item**: Report lost or found items
5. **Claim Item**: Claim ownership of items

## 🚀 Deployment

### Render (Recommended)
1. Push code to GitHub
2. Connect repository to Render
3. Deploy backend service
4. Deploy frontend service
5. Configure environment variables

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Other Platforms
- **Vercel**: Frontend deployment
- **Railway**: Full-stack deployment
- **Heroku**: Alternative backend hosting

## 🧪 Testing

```bash
# Test deployment configuration
node test-deployment.js

# Test API endpoints
curl http://localhost:5000/api/auth/signup

# Test frontend
npm run dev
```

## 📊 Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  name: String (required),
  rollNumber: String,
  department: String,
  avatarUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Item Model
```javascript
{
  title: String (required),
  description: String (required),
  imageUrl: String,
  location: String,
  status: String (lost/found),
  postedBy: ObjectId (User),
  claimedBy: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Email Domain Validation**: Only @klh.edu.in emails
- **Input Sanitization**: XSS protection
- **CORS Configuration**: Secure cross-origin requests
- **Session Management**: Secure cookie-based sessions

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Modern Interface**: Clean, intuitive design
- **Loading States**: User feedback during operations
- **Error Handling**: Graceful error management
- **Form Validation**: Client and server-side validation

## 📈 Performance

- **Lazy Loading**: Optimized component loading
- **Image Optimization**: Efficient file handling
- **Caching**: Strategic data caching
- **Database Indexing**: Optimized queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: See DEPLOYMENT.md
- **Issues**: GitHub Issues
- **Email**: Contact the development team

---

## 🎉 Success!

Your KLH Lost & Found platform is ready for deployment! 

**Next Steps:**
1. Deploy to Render
2. Test all functionality
3. Share with KLH students
4. Monitor and maintain

**Happy Coding! 🚀**