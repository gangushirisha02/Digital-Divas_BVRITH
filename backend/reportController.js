import WeeklyReport from '../models/WeeklyReport.js';
import ReportEntry from '../models/ReportEntry.js';
import UploadedFile from '../models/UploadedFile.js';

export const createWeeklyReport = async (req, res) => {
  const report = await WeeklyReport.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(report);
};

export const getWeeklyReports = async (_, res) => {
  const reports = await WeeklyReport.find().sort({ weekStart: -1 }).populate('createdBy', 'name role department');
  res.json(reports);
};

export const createEntry = async (req, res) => {
  const entry = await ReportEntry.create({
    ...req.body,
    contributorId: req.user.id,
    contributorName: req.user.name
  });
  res.status(201).json(entry);
};

export const getEntriesByWeek = async (req, res) => {
  const entries = await ReportEntry.find({ weeklyReportId: req.params.weeklyReportId }).sort({ createdAt: -1 });
  res.json(entries);
};

export const updateEntry = async (req, res) => {
  const updated = await ReportEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteEntry = async (req, res) => {
  await ReportEntry.findByIdAndDelete(req.params.id);
  await UploadedFile.deleteMany({ entryId: req.params.id });
  res.json({ message: 'Entry deleted' });
};

export const uploadEntryFiles = async (req, res) => {
  const files = await Promise.all((req.files || []).map(file => UploadedFile.create({
    entryId: req.params.entryId,
    originalName: file.originalname,
    storedName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    uploadedBy: req.user.id,
    path: file.path
  })));
  res.status(201).json(files);
};

export const getDashboardSummary = async (req, res) => {
  const weeklyReportId = req.params.weeklyReportId;
  const entries = await ReportEntry.find({ weeklyReportId });
  const files = await UploadedFile.countDocuments();
  const sectionMap = {};

  entries.forEach(entry => {
    sectionMap[entry.sectionName] = (sectionMap[entry.sectionName] || 0) + 1;
  });

  res.json({
    totalEntries: entries.length,
    uploadedFiles: files,
    sectionProgress: sectionMap,
    contributors: [...new Set(entries.map(e => e.contributorName))].length
  });
};