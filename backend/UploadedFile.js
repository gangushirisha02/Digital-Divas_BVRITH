import mongoose from 'mongoose';

const uploadedFileSchema = new mongoose.Schema({
  entryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportEntry', required: true },
  originalName: { type: String, required: true },
  storedName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  path: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('UploadedFile', uploadedFileSchema);