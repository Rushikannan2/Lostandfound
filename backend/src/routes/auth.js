import { Router } from 'express';
import User from '../models/User.js';
import { isKLHEmail } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/signup
// Student registration
router.post('/signup', async (req, res) => {
  try {
    const { name, email, rollNumber, department, avatarUrl } = req.body || {};

    console.log('Signup attempt:', { name, email, rollNumber, department });

    if (!email || !isKLHEmail(email)) {
      return res.status(403).json({ error: 'Only @klh.edu.in emails are allowed' });
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const displayName = name.trim();

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists. Please login instead.' });
    }

    console.log('Creating new user:', { email, name: displayName, rollNumber, department });
    user = await User.create({ 
      email, 
      name: displayName, 
      rollNumber: rollNumber || null,
      department: department || null,
      avatarUrl: avatarUrl || null 
    });

    // store user in signed cookie
    const cookiePayload = { 
      _id: user._id.toString(), 
      email: user.email, 
      name: user.name, 
      rollNumber: user.rollNumber,
      department: user.department,
      avatarUrl: user.avatarUrl 
    };
    
    res.cookie('user', cookiePayload, {
      httpOnly: true,
      sameSite: 'lax',
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    console.log('Signup successful for:', user.email);
    res.json({ user: cookiePayload });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed. Please try again.' });
  }
});

// POST /api/auth/login
// Simple login for KLH students
router.post('/login', async (req, res) => {
  try {
    const { name, email, avatarUrl } = req.body || {};

    console.log('Login attempt:', { name, email });

    if (!email || !isKLHEmail(email)) {
      return res.status(403).json({ error: 'Only @klh.edu.in emails are allowed' });
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const displayName = name.trim();

    let user = await User.findOne({ email });
    if (!user) {
      console.log('Creating new user:', { email, name: displayName });
      user = await User.create({ 
        email, 
        name: displayName, 
        avatarUrl: avatarUrl || null 
      });
    } else {
      console.log('Updating existing user:', user._id);
      user.name = displayName;
      if (avatarUrl) user.avatarUrl = avatarUrl;
      await user.save();
    }

    // store user in signed cookie
    const cookiePayload = { 
      _id: user._id.toString(), 
      email: user.email, 
      name: user.name, 
      avatarUrl: user.avatarUrl 
    };
    
    res.cookie('user', cookiePayload, {
      httpOnly: true,
      sameSite: 'lax',
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    console.log('Login successful for:', user.email);
    res.json({ user: cookiePayload });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
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


