import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    rollNumber: { type: String },
    department: { type: String },
    avatarUrl: { type: String },
    googleId: { type: String },
    // role, etc, not needed now
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);


