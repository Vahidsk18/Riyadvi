const { z } = require('zod');
const phone = z.string().trim().regex(/^[+\d][\d\s-]{7,15}$/, 'Invalid phone');
const base = { name: z.string().trim().min(2).max(100), email: z.string().trim().email(), phone };
module.exports = {
  contact: z.object({ ...base, company: z.string().max(100).optional(), requirement: z.string().max(100).optional(), message: z.string().min(5).max(2000) }),
  consultation: z.object({ ...base, company: z.string().max(100).optional(), preferredDate: z.string().optional(), message: z.string().max(2000).optional() }),
  'health-checkup': z.object({
    ...base, company: z.string().min(1), website: z.string().max(200).optional(), industry: z.string().optional(),
    marketing: z.string().optional(), technology: z.string().optional(), challenges: z.string().max(2000).optional()
  }),
  'lead-magnet': z.object({ ...base, company: z.string().min(1) }),
  application: z.object({ ...base, position: z.string().min(2), resumeUrl: z.string().url('Resume link must be a URL'), message: z.string().max(2000).optional() }),
};
