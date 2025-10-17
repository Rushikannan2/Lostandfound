import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String }, // can be URL or base64 data URL
    location: { type: String, required: true },
    status: { type: String, enum: ['lost', 'found', 'claimed'], default: 'lost' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Item', itemSchema);


