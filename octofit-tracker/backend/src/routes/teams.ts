import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_request, response) => {
  const teams = await Team.find().populate('members').sort({ name: 1 });
  response.json(teams);
});

router.post('/', async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
});

export default router;
