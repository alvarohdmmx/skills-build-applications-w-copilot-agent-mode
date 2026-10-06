import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const userIds = {
      alex: new mongoose.Types.ObjectId('670000000000000000000001'),
      jordan: new mongoose.Types.ObjectId('670000000000000000000002'),
      sam: new mongoose.Types.ObjectId('670000000000000000000003'),
      taylor: new mongoose.Types.ObjectId('670000000000000000000004'),
    };
    const teamIds = {
      trailblazers: new mongoose.Types.ObjectId('680000000000000000000001'),
      paceMakers: new mongoose.Types.ObjectId('680000000000000000000002'),
    };
    const users = [
      {
        _id: userIds.alex,
        username: 'alex.runner',
        displayName: 'Alex Rivera',
        email: 'alex.rivera@example.com',
      },
      {
        _id: userIds.jordan,
        username: 'jordan.moves',
        displayName: 'Jordan Lee',
        email: 'jordan.lee@example.com',
      },
      { _id: userIds.sam, username: 'sam.trains', displayName: 'Sam Patel', email: 'sam.patel@example.com' },
      {
        _id: userIds.taylor,
        username: 'taylor.active',
        displayName: 'Taylor Morgan',
        email: 'taylor.morgan@example.com',
      },
    ];
    const teams = [
      { _id: teamIds.trailblazers, name: 'Trailblazers', members: [userIds.alex, userIds.sam] },
      { _id: teamIds.paceMakers, name: 'Pace Makers', members: [userIds.jordan, userIds.taylor] },
    ];
    const activities = [
      {
        _id: new mongoose.Types.ObjectId('690000000000000000000001'),
        user: userIds.alex,
        type: 'Running',
        durationMinutes: 38,
        distanceKm: 6.2,
        calories: 410,
        performedAt: new Date('2026-10-05T07:30:00Z'),
      },
      {
        _id: new mongoose.Types.ObjectId('690000000000000000000002'),
        user: userIds.jordan,
        type: 'Cycling',
        durationMinutes: 52,
        distanceKm: 18.5,
        calories: 520,
        performedAt: new Date('2026-10-04T08:15:00Z'),
      },
      {
        _id: new mongoose.Types.ObjectId('690000000000000000000003'),
        user: userIds.sam,
        type: 'Strength training',
        durationMinutes: 45,
        calories: 290,
        performedAt: new Date('2026-10-03T17:00:00Z'),
      },
      {
        _id: new mongoose.Types.ObjectId('690000000000000000000004'),
        user: userIds.taylor,
        type: 'Walking',
        durationMinutes: 60,
        distanceKm: 4.8,
        calories: 240,
        performedAt: new Date('2026-10-02T12:00:00Z'),
      },
    ];
    const leaderboard = [
      {
        _id: new mongoose.Types.ObjectId('6a0000000000000000000001'),
        user: userIds.alex,
        team: teamIds.trailblazers,
        points: 1240,
        rank: 1,
        period: 'all-time',
      },
      {
        _id: new mongoose.Types.ObjectId('6a0000000000000000000002'),
        user: userIds.jordan,
        team: teamIds.paceMakers,
        points: 1085,
        rank: 2,
        period: 'all-time',
      },
      {
        _id: new mongoose.Types.ObjectId('6a0000000000000000000003'),
        user: userIds.sam,
        team: teamIds.trailblazers,
        points: 970,
        rank: 3,
        period: 'all-time',
      },
      {
        _id: new mongoose.Types.ObjectId('6a0000000000000000000004'),
        user: userIds.taylor,
        team: teamIds.paceMakers,
        points: 815,
        rank: 4,
        period: 'all-time',
      },
    ];
    const workouts: Array<{
      _id: mongoose.Types.ObjectId;
      title: string;
      description: string;
      difficulty: 'beginner' | 'intermediate' | 'advanced';
      exercises: Array<{ name: string; durationMinutes: number }>;
    }> = [
      {
        _id: new mongoose.Types.ObjectId('6b0000000000000000000001'),
        title: 'Easy Run',
        description: 'A relaxed aerobic run to build endurance.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Steady outdoor run', durationMinutes: 30 },
          { name: 'Cool-down walk', durationMinutes: 5 },
        ],
      },
      {
        _id: new mongoose.Types.ObjectId('6b0000000000000000000002'),
        title: 'Full Body Strength',
        description: 'A balanced strength session using bodyweight movements.',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Squats', durationMinutes: 10 },
          { name: 'Push-ups', durationMinutes: 8 },
          { name: 'Plank', durationMinutes: 5 },
        ],
      },
      {
        _id: new mongoose.Types.ObjectId('6b0000000000000000000003'),
        title: 'Cycling Intervals',
        description: 'Short efforts with recovery periods to improve cycling fitness.',
        difficulty: 'advanced',
        exercises: [
          { name: 'Warm-up ride', durationMinutes: 10 },
          { name: 'Interval set', durationMinutes: 24 },
          { name: 'Cool-down ride', durationMinutes: 8 },
        ],
      },
    ];

    await Promise.all([
      User.deleteMany({ _id: { $in: users.map(({ _id }) => _id) } }).then(() => User.insertMany(users)),
      Team.deleteMany({ _id: { $in: teams.map(({ _id }) => _id) } }).then(() => Team.insertMany(teams)),
      Activity.deleteMany({ _id: { $in: activities.map(({ _id }) => _id) } }).then(() =>
        Activity.insertMany(activities),
      ),
      Leaderboard.deleteMany({ _id: { $in: leaderboard.map(({ _id }) => _id) } }).then(() =>
        Leaderboard.insertMany(leaderboard),
      ),
      Workout.deleteMany({ _id: { $in: workouts.map(({ _id }) => _id) } }).then(() => Workout.insertMany(workouts)),
    ]);

    console.log('Seeded 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts.');
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

// Seed the octofit_db database with test data
void seedDatabase();
