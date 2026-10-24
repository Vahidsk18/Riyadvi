'use client';
import { useState } from 'react';
import { API } from '@/lib/data';
const steps = [
  { title: 'Business Information', fields: [['name', 'Name'], ['email', 'Email', 'email'], ['phone', 'Phone'], ['company', 'Company'], ['industry', 'Industry']] },
  { title: 'Website & Digital Presence', fields: [['website', 'Website URL']] },
  { title: 'Marketing', fields: [['marketing', 'Current marketing activities', 'textarea']] },
  { title: 'Technology', fields: [['technology', 'Current technology stack', 'textarea']] },
  { title: 'Business Challenges', fields: [['challenges', 'Biggest challenges', 'textarea']] },
];
export default function Checkup() {
  const [i, setI] = useState(0); const [v, setV] = useState({}); const [err, setErr] = useState({}); const [done, setDone] = useState(false);
  const step = steps[i];
  async function submit() {
    try {
      const r = await fetch(`${API}/health-checkup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
      const j = await r.json();
      if (r.ok) return setDone(true);
      const e = Object.fromEntries((j.errors || []).map((x) => [x.field, x.message])); setErr(e);
      if (Object.keys(e).some((k) => ['name', 'email', 'phone', 'company', 'industry'].includes(k))) setI(0);
    } catch { setErr({ name: 'Network error. Try again.' }); setI(0); }
  }
  if (done) return <main className="pt-32 text-center text-gold text-2xl">Thank you! We will share your checkup report soon.</main>;
  return (
    <main className="mx-auto max-w-xl px-5 pt-28 pb-20">
      <h1 className="text-3xl font-bold">Is Your Business Ready for Its Next <span className="text-gold">Digital Growth Stage?</span></h1>
      <div className="h-1 bg-white/10 mt-6"><div className="h-1 bg-gold transition-all" style={{ width: `${((i + 1) / steps.length) * 100}%` }} /></div>
      <h2 className="mt-6 mb-4 font-semibold">Step {i + 1}: {step.title}</h2>
      <div className="space-y-4">{step.fields.map(([k, l, t]) => (<div key={k}><label className="text-sm">{l}</label>
        {t === 'textarea' ? <textarea className="input" rows={4} value={v[k] || ''} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
          : <input className="input" type={t || 'text'} value={v[k] || ''} onChange={(e) => setV({ ...v, [k]: e.target.value })} />}
        {err[k] && <p className="text-red-400 text-sm">{err[k]}</p>}</div>))}</div>
      <div className="flex justify-between mt-8">
        <button disabled={!i} onClick={() => setI(i - 1)} className="btn btn-ghost disabled:opacity-30">Back</button>
        {i < steps.length - 1 ? <button onClick={() => setI(i + 1)} className="btn btn-gold">Next</button> : <button onClick={submit} className="btn btn-gold">Submit</button>}
      </div>
    </main>);
}
