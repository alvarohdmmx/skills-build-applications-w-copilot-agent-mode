import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    exercises: [
      {
        name: { type: String, required: true, trim: true },
        durationMinutes: { type: Number, min: 1 },
      },
    ],
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
