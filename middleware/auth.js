const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  if (!process.env.JWT_SECRET) return res.status(503).json({ error: 'Admin security is not configured' });
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'يلزم تسجيل الدخول' });
  try { const payload = jwt.verify(token, process.env.JWT_SECRET); if (payload.role !== 'admin') throw new Error('role'); req.admin = payload; next(); }
  catch { return res.status(401).json({ error: 'انتهت الجلسة أو أن رمز الدخول غير صالح' }); }
};
