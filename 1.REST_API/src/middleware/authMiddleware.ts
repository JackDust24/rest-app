export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token && token === 'Bearer faketoken_user1') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
