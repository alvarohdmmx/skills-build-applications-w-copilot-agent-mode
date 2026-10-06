import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_request, response) => {
  const workouts = await Workout.find().sort({ title: 1 });
  response.json(workouts);
});

router.post('/', async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json(workout);
});

export default router;
