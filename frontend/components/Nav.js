'use client';
import Link from 'next/link';
import { useState } from 'react';
const links = [['Services', '/#services'], ['Portfolio', '/portfolio'], ['Careers', '/careers'], ['Health Checkup', '/business-health-checkup'], ['Contact', '/contact']];
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-5 py-3">
        <Link href="/" className="font-bold text-gold text-lg">Riyadvi</Link>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        <ul className={`${open ? 'flex' : 'hidden'} md:flex absolute md:static top-full inset-x-0 flex-col md:flex-row gap-4 bg-black md:bg-transparent p-5 md:p-0`}>
          {links.map(([l, h]) => <li key={h}><Link href={h} onClick={() => setOpen(false)} className="hover:text-gold">{l}</Link></li>)}
        </ul>
      </nav>
    </header>
  );
}
