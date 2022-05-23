import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    ranking: {
      type: String,
    },
    rankPosition: {
      type: Number,
    },
    photoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'players',
  },
);
