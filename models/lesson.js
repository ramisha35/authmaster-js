import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TeacherProfile',
      required: true,
      index: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Court',
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    durationMinutes: {
      type: Number,
      enum: [30, 60, 90],
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


const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;