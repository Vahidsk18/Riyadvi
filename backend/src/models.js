const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
// One flexible collection per lead type keeps code small; "type" is indexed.
const submissionSchema = new mongoose.Schema({
  type: { type: String, enum: ['contact', 'consultation', 'health-checkup', 'lead-magnet', 'application'], index: true, required: true },
  name: String, email: String, phone: String, company: String,
  data: mongoose.Schema.Types.Mixed,
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });
module.exports = { Submission: mongoose.model('Submission', submissionSchema) };
