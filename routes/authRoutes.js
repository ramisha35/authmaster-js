  import express from 'express';
  import User from '../models/user.js';
  import bcrypt from 'bcrypt';
  import {conflictError, notFoundError, unauthorizedError} from '../exceptions/index.js'; // barrel pattern import
  import { asyncHandler } from '../middlewares/asyncHandler.js';
  import { generateToken } from '../services/jwtService.js';
  import { authenticate, authorizeRoles } from '../middlewares/authMiddleware.js'; 

  const router = express.Router();


  router.post('/auth/register', asyncHandler(async (req, res) => {
      const { name, surname, mail, password } = req.body;
    
      const existing = await User.findOne({ mail });
      if (existing) throw new conflictError('User already exists');
    
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ name, surname, mail, passwordHash });
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
      res.status(200).json({ token });
    }));
    
    router.get('/getAll', authenticate, authorizeRoles('Admin'),asyncHandler(async (req, res) => {
      const users = await User.find();
    
      const result = users.map(user => ({
        id: user._id,
        name: user.name,
        surname: user.surname,
        mail: user.mail,
        role: user.role,
      }));
    
      res.status(200).json(result);
    }));
    
    export default router;