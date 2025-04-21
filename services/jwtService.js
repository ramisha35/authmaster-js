import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'supersecret';
const expiresIn = '1h';

export function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      mail: user.mail,
      role: user.role
    },
    secret,
    { expiresIn }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}
