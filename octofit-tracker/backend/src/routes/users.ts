import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_request, response) => {
  const users = await User.find().sort({ username: 1 });
  response.json(users);
});

router.post('/', async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
});

export default router;
