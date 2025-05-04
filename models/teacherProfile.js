import mongoose from 'mongoose';

const teacherProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    hourlyRate: {
      type: Number,
      min: 0,
      required: true,
    },
    weeklyDaysOff: {
      type: [Number], 
      default: [],
    },
  },
  { timestamps: true }
);

const TeacherProfile = mongoose.model('TeacherProfile', teacherProfileSchema);
export default TeacherProfile;