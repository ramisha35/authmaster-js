  import express from 'express';
  import User from '../models/user.js';
  import bcrypt from 'bcrypt';
  import {conflictError, notFoundError, unauthorizedError} from '../exceptions/index.js'; // barrel pattern import
  import { asyncHandler } from '../middlewares/asyncHandler.js';

  const router = express.Router();


  router.post('/auth/register', asyncHandler(async (req, res) => {
      const { name, surname, mail, password } = req.body;
    
      const existing = await User.findOne({ mail });
      if (existing) throw new conflictError('User already exists');
    
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ name, surname, mail, passwordHash });
      await user.save();
    
      res.status(201).json({ id: user._id, mail: user.mail });
    }));
    

    router.post('/auth/login', asyncHandler(async (req, res) => {
      const { mail, password } = req.body;
    
      const user = await User.findOne({ mail });
      if (!user) throw new notFoundError('User not found');
    
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) throw new unauthorizedError('Invalid credentials');
    
      res.status(200).json({ id: user._id, mail: user.mail });
    }));
    
    router.get('/getAll', asyncHandler(async (req, res) => {
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