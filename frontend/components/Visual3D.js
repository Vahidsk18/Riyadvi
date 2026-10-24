'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-gold/5 rounded-xl" /> });

// Picks full / reduced / static rendering per device (reduced-motion, low CPU cores, small screens).
export default function Visual3D({ kind, className = 'h-80' }) {
  const [mode, setMode] = useState('pending');
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd = (navigator.hardwareConcurrency || 4) <= 2;
    setMode(reduce || lowEnd ? 'static' : window.innerWidth < 768 ? 'mobile' : 'full');
  }, []);
  return (
    <div className={`${className} w-full`}>
      {mode === 'static' || mode === 'pending'
        ? <div className="w-full h-full rounded-xl bg-gradient-to-br from-gold/30 via-black to-gold/10" />
        : <Scene3D kind={kind} mobile={mode === 'mobile'} />}
    </div>
  );
}
