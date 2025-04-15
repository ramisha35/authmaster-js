import { container } from '../DI/Container.js';
import { asyncHandler } from '../Middlewares/AsyncHandler.js';

const authService = container.authService;

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.status(200).json(result);
});

export const getAll = asyncHandler(async (req, res) => {
  const result = await authService.getAll();
  res.status(200).json(result);
});

