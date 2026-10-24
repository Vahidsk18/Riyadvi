'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const steps = ['Business Challenge', 'Strategy', 'Design', 'Technology', 'Launch', 'Growth'];
export default function Journey() {
  const root = useRef();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.step').forEach((el) =>
        gsap.from(el, { opacity: 0, y: 60, scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: true } }));
      gsap.from('.line', { scaleY: 0, transformOrigin: 'top', scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'bottom 70%', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative mx-auto max-w-3xl px-5 py-24">
      <h2 className="text-3xl font-bold mb-12 text-center">Our <span className="text-gold">Digital Transformation</span> Journey</h2>
      <div className="line absolute left-8 top-40 bottom-20 w-px bg-gold/60" />
      {steps.map((s, i) => (
        <div key={s} className="step glass rounded-xl p-6 mb-10 ml-14">
          <span className="text-gold font-mono">0{i + 1}</span><h3 className="text-xl font-semibold">{s}</h3>
        </div>
      ))}
    </section>
  );
}
