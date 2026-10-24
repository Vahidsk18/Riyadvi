import Link from 'next/link';
import { notFound } from 'next/navigation';
import Visual3D from '@/components/Visual3D';
import { projects, services, getProject } from '@/lib/data';
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
const Block = ({ t, children }) => (<div className="glass rounded-xl p-6"><h3 className="text-gold font-semibold mb-2">{t}</h3>{children}</div>);
export default function CaseStudy({ params }) {
  const p = getProject(params.slug); if (!p) notFound();
  return (
    <main className="mx-auto max-w-5xl px-5 pt-28 pb-20">
      <h1 className="text-4xl font-bold">{p.title}</h1><p className="text-white/60 mt-2">{p.client} · {p.industry}</p>
      {p.interactive3d && <div className="mt-8"><Visual3D kind="icosa" className="h-96" /></div>}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <Block t="Challenge"><p>{p.challenge}</p></Block><Block t="Solution"><p>{p.solution}</p></Block>
        <Block t="Technologies"><p>{p.tech.join(', ')}</p></Block>
        <Block t="Results"><ul>{p.results.map((r) => <li key={r}>✓ {r}</li>)}</ul></Block>
      </div>
      <h3 className="mt-10 mb-3 font-semibold">Related Services</h3>
      <div className="flex gap-3 flex-wrap">{p.services.map((s) => <Link key={s} href={`/services/${s}`} className="btn btn-ghost">{services.find((x) => x.slug === s)?.title}</Link>)}</div>
    </main>
  );
}
