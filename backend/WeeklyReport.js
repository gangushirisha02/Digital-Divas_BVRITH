import mongoose from 'mongoose';

const weeklyReportSchema = new mongoose.Schema({
  title: { type: String, default: 'Department Weekly Report' },
  weekStart: { type: Date, required: true },
  weekEnd: { type: Date, required: true },
  department: { type: String, required: true },
  status: { type: String, enum: ['draft', 'in_review', 'submitted'], default: 'draft' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('WeeklyReport', weeklyReportSchema);