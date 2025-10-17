// Simple domain-based authentication without JWT per requirement.
// We store minimal user info in a signed cookie after login.

export function requireAuth(req, res, next) {
  const user = req.signedCookies?.user;
  if (!user) return res.status(401).json({ error: 'Not authenticated' });
  req.user = user; // { _id, email, name, avatarUrl }
  next();
}

export function isKLHEmail(email) {
  return typeof email === 'string' && email.toLowerCase().endsWith('@klh.edu.in');
}


