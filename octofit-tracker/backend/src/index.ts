import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';
import './config/database';

const app = express();
const port = 8000;
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  const isValidationError =
    error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError;
  const isDuplicateError =
    typeof error === 'object' && error !== null && 'code' in error && error.code === 11000;
  const parserStatus =
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number' &&
    error.status >= 400 &&
    error.status < 500
      ? error.status
      : undefined;
  const status = isDuplicateError ? 409 : isValidationError ? 400 : parserStatus ?? 500;
  const message =
    status === 500
      ? 'An unexpected error occurred'
      : error instanceof Error
        ? error.message
        : 'The request could not be processed';
  response.status(status).json({ error: message });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});