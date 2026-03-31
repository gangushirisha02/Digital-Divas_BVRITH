import express from 'express';
import {
  createWeeklyReport,
  getWeeklyReports,
  createEntry,
  getEntriesByWeek,
  updateEntry,
  deleteEntry,
  uploadEntryFiles,
  getDashboardSummary
} from '../controllers/reportController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();
router.post('/weekly', protect, authorize('coordinator', 'admin'), createWeeklyReport);
router.get('/weekly', protect, getWeeklyReports);
router.get('/weekly/:weeklyReportId/entries', protect, getEntriesByWeek);
router.get('/weekly/:weeklyReportId/dashboard', protect, getDashboardSummary);
router.post('/entries', protect, authorize('faculty', 'coordinator', 'admin'), createEntry);
router.put('/entries/:id', protect, authorize('faculty', 'coordinator', 'admin'), updateEntry);
router.delete('/entries/:id', protect, authorize('coordinator', 'admin'), deleteEntry);
router.post('/entries/:entryId/files', protect, upload.array('files', 10), uploadEntryFiles);

export default router;