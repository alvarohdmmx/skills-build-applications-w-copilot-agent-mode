import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, required: true, trim: true, default: 'all-time' },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
