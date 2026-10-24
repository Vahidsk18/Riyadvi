import Link from 'next/link';
import { notFound } from 'next/navigation';
import Visual3D from '@/components/Visual3D';
import { services, projects, getService } from '@/lib/data';
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));
const List = ({ title, items }) => (<div className="glass rounded-xl p-6"><h3 className="text-gold font-semibold mb-3">{title}</h3><ul className="space-y-1 text-white/80">{items.map((i) => <li key={i}>• {i}</li>)}</ul></div>);
export default function ServicePage({ params }) {
  const s = getService(params.slug); if (!s) notFound();
  const related = projects.filter((p) => p.services.includes(s.slug));
  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div><h1 className="text-4xl md:text-5xl font-bold">{s.title}</h1><p className="mt-4 text-white/70 text-lg">{s.tagline}</p>
          <Link href="/contact" className="btn btn-gold mt-6">Get a Quote</Link></div>
        <Visual3D kind={s.visual} className="h-96" />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-16">
        <div className="glass rounded-xl p-6"><h3 className="text-gold font-semibold">The Problem</h3><p className="mt-2">{s.problem}</p></div>
        <div className="glass rounded-xl p-6"><h3 className="text-gold font-semibold">Our Solution</h3><p className="mt-2">{s.solution}</p></div>
        <List title="Key Features" items={s.features} /><List title="Industry Use Cases" items={s.useCases} />
        <List title="Technology Stack" items={s.stack} /><List title="Process" items={s.process.map((p, i) => `${i + 1}. ${p}`)} />
      </div>
      {related.length > 0 && <><h2 className="text-2xl font-bold mt-16 mb-4">Related Work</h2>
        <div className="grid md:grid-cols-3 gap-6">{related.map((p) => <Link key={p.slug} href={`/portfolio/${p.slug}`} className="glass rounded-xl p-6 hover:border-gold">{p.title}</Link>)}</div></>}
    </main>
  );
}
