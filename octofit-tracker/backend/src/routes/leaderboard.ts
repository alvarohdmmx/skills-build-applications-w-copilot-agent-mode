import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_request, response) => {
  const entries = await Leaderboard.find()
    .populate('user')
    .populate('team')
    .sort({ points: -1, rank: 1 });
  response.json(entries);
});

router.post('/', async (request, response) => {
  const entry = await Leaderboard.create(request.body);
  response.status(201).json(entry);
});

export default router;
