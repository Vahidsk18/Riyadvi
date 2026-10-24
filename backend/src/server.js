require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const api = require('./routes');

const app = express();
app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || '').split(',') }));
app.use(express.json({ limit: '100kb' }));
app.use('/api', rateLimit({ windowMs: 60_000, max: 60 }));
app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api', api);
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('API running')))
  .catch((e) => { console.error('DB connection failed', e.message); process.exit(1); });

// app.listen(3000)