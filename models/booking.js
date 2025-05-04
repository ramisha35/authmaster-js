import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Court',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    durationMinutes: {
      type: Number,
      enum: [60, 90, 120],
      default: 60,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
      index: true,
    },
  },
  { timestamps: true }
);

const Booking =  mongoose.model('Booking', bookingSchema);
export default Booking;