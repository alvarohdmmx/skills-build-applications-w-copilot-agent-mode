import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_request, response) => {
  const activities = await Activity.find().populate('user').sort({ performedAt: -1 });
  response.json(activities);
});

router.post('/', async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(activity);
});

export default router;
