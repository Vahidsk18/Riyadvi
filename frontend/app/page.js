import Link from 'next/link';
import Visual3D from '@/components/Visual3D';
import Journey from '@/components/Journey';
import { services } from '@/lib/data';
export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-70"><Visual3D kind="network" className="h-full" /></div>
        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-24">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">Custom Software & Digital Solutions to <span className="text-gold">Grow Your Business</span></h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">Web & App Development, UI/UX Design, and Business Strategy – all tailored to your needs.</p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link href="/contact" className="btn btn-gold">Book a Free Consultation</Link>
            <Link href="#services" className="btn btn-ghost">Explore Our Solutions</Link>
          </div>
        </div>
      </section>
      <Journey />
      <section id="services" className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-3xl font-bold mb-10">Our <span className="text-gold">Services</span></h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="glass rounded-2xl p-4 hover:border-gold transition block">
              <Visual3D kind={s.visual} className="h-48" />
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3><p className="text-white/60">{s.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="text-center py-24"><Link href="/business-health-checkup" className="btn btn-gold">Take the Business Health Checkup</Link></section>
    </main>
  );
}
