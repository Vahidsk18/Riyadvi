const router = require('express').Router();
const { Submission } = require('./models');
const schemas = require('./schemas');

const endpoints = { contact: 'contact', consultation: 'consultation', 'health-checkup': 'health-checkup', 'lead-magnet': 'lead-magnet', applications: 'application' };

Object.entries(endpoints).forEach(([path, type]) => {
  router.post(`/${path}`, async (req, res, next) => {
    try {
      const parsed = schemas[type].safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false, message: 'Validation failed',
          errors: parsed.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message }))
        });
      }
      const { name, email, phone, company, ...data } = parsed.data;
      const doc = await Submission.create({ type, name, email, phone, company, data });
      // TODO: send email notification (nodemailer/Resend) here
      res.status(201).json({ success: true, message: 'Submitted successfully', id: doc._id });
    } catch (e) { next(e); }
  });
});

// --- Admin (simple token auth; replace with JWT for production) ---
const auth = (req, res, next) =>
  req.headers['x-admin-token'] === process.env.ADMIN_TOKEN ? next() : res.status(401).json({ success: false, message: 'Unauthorized' });

router.get('/admin/stats', auth, async (_, res, next) => {
  try {
    const rows = await Submission.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]);
    res.json({ success: true, stats: Object.fromEntries(rows.map((r) => [r._id, r.count])) });
  } catch (e) { next(e); }
});
router.get('/admin/submissions', auth, async (req, res, next) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    res.json({ success: true, items: await Submission.find(filter).sort({ createdAt: -1 }).limit(200) });
  } catch (e) { next(e); }
});
router.patch('/admin/submissions/:id', auth, async (req, res, next) => {
  try {
    const item = await Submission.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    res.json({ success: true, item });
  } catch (e) { next(e); }
});
module.exports = router;
