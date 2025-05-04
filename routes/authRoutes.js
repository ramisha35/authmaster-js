import express from 'express';
import bcrypt from 'bcrypt';
import { User, conflictError, notFoundError, unauthorizedError, 
  asyncHandler, generateToken, authenticate, authorizeRoles} from '../index.js';

  const router = express.Router();

  router.post('/auth/register', asyncHandler(async (req, res) => {
      const { name, surname, mail, password, phone} = req.body;
    
      const existing = await User.findOne({ mail });
      if (existing) throw new conflictError('User already exists');

      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ name, surname, mail, passwordHash, phone });
      await user.save();
    
      const userResponse = user.toObject();
      delete userResponse.passwordHash;
    
      res.status(201).json(userResponse);
    }));
    

    router.post('/auth/login', asyncHandler(async (req, res) => {
      const { mail, password } = req.body;
    
      const user = await User.findOne({ mail });
      if (!user) throw new notFoundError('User not found');
    
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) throw new unauthorizedError('Invalid credentials');
    
      const token = generateToken(user);
      res.status(200).json({token : token });
    }));
    
    export default router;