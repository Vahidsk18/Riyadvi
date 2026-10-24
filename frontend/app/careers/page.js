'use client';
import Link from 'next/link';
import { useState } from 'react';
import { jobs } from '@/lib/data';
export default function Careers() {
  const [f, setF] = useState({ department: '', designation: '', experience: '' });
  const opts = (k) => [...new Set(jobs.map((j) => j[k]))];
  const list = jobs.filter((j) => Object.entries(f).every(([k, v]) => !v || j[k] === v));
  return (
    <main className="mx-auto max-w-4xl px-5 pt-28 pb-20"><h1 className="text-4xl font-bold mb-6">Careers</h1>
      <div className="grid grid-cols-3 gap-3 mb-8">{['department', 'designation', 'experience'].map((k) => (
        <select key={k} className="input" onChange={(e) => setF({ ...f, [k]: e.target.value })}><option value="">All {k}</option>{opts(k).map((o) => <option key={o} className="text-black">{o}</option>)}</select>))}</div>
      <div className="space-y-4">{list.map((j) => (<Link key={j.slug} href={`/careers/${j.slug}`} className="glass rounded-xl p-5 block hover:border-gold">
        <h2 className="font-semibold">{j.title}</h2><p className="text-sm text-white/60">{j.department} · {j.experience}</p></Link>))}</div>
    </main>);
}
