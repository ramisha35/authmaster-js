import mongoose from 'mongoose';

const COURT_STATUS = ['available', 'booked', 'maintenance', 'disabled'];

const courtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: COURT_STATUS,
      default: 'available',
      index: true,
    },
    surfaceType: {
      type: String,
      enum: ['indoor', 'outdoor'],
      default: 'indoor',
    },
  },
  { timestamps: true }
);

const Court = mongoose.model('Court', courtSchema);

export default Court;