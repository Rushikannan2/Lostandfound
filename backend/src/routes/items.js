import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Item from '../models/Item.js';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Local disk storage for images (simple). Alternatively, integrate Cloudinary via env.
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname || '').toLowerCase();
    cb(null, unique + ext);
  },
});

const upload = multer({ storage });

// GET /api/items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('postedBy', 'name email avatarUrl').populate('claimedBy', 'name email');
    res.json({ items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.json({ items: [] });
  }
});

// POST /api/items  (auth required)
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  const { title, description, location, status, imageBase64 } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({ error: 'title, description, location required' });
  }

  let imageUrl = undefined;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  } else if (imageBase64 && String(imageBase64).startsWith('data:')) {
    // Save base64 to a file for simplicity
    const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
    if (matches) {
      const ext = matches[1].includes('png') ? '.png' : matches[1].includes('jpeg') ? '.jpg' : '.img';
      const buffer = Buffer.from(matches[2], 'base64');
      const fname = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const fpath = path.join(uploadDir, fname);
      fs.writeFileSync(fpath, buffer);
      imageUrl = `/uploads/${fname}`;
    }
  }

  const item = await Item.create({
    title,
    description,
    location,
    status: ['lost', 'found'].includes(status) ? status : 'lost',
    imageUrl,
    postedBy: req.user._id,
  });

  res.status(201).json({ item });
});

// POST /api/items/:id/claim (auth required)
router.post('/:id/claim', requireAuth, async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  if (item.status === 'claimed') return res.status(400).json({ error: 'Already claimed' });

  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).json({ error: 'Invalid user' });

  item.status = 'claimed';
  item.claimedBy = user._id;
  await item.save();

  res.json({ item });
});

export default router;


