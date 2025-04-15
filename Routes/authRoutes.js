import express from 'express';
import { register, login, getAll } from '../Controllers/AuthController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getAll', getAll);

export default router;
