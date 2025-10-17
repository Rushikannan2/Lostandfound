import { Router } from 'express';
import User from '../models/User.js';
import { isKLHEmail } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
// Minimal "Google" login simulation: accept name, email, avatarUrl
// Only allow @klh.edu.in emails by simple if-else check.
router.post('/login', async (req, res) => {
  const { name, email, avatarUrl, googleId } = req.body || {};

  if (!email || !isKLHEmail(email)) {
    return res.status(403).json({ error: 'Only @klh.edu.in emails allowed' });
  }

  const displayName = name && String(name).trim().length > 0 ? name : email.split('@')[0];

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, name: displayName, avatarUrl, googleId });
  } else if (user.name !== displayName || user.avatarUrl !== avatarUrl) {
    user.name = displayName;
    user.avatarUrl = avatarUrl;
    await user.save();
  }

  // store minimal user in signed cookie, no JWT
  const cookiePayload = { _id: user._id.toString(), email: user.email, name: user.name, avatarUrl: user.avatarUrl };
  res.cookie('user', cookiePayload, {
    httpOnly: true,
    sameSite: 'lax',
    signed: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  res.json({ user: cookiePayload });
});

router.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.json({ ok: true });
});

router.get('/me', (req, res) => {
  const user = req.signedCookies?.user || null;
  res.json({ user });
});

export default router;


