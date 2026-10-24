import Link from 'next/link';
import { projects } from '@/lib/data';
export default function Portfolio() {
  return (<main className="mx-auto max-w-6xl px-5 pt-28 pb-20"><h1 className="text-4xl font-bold mb-10">Our <span className="text-gold">Work</span></h1>
    <div className="grid md:grid-cols-3 gap-6">{projects.map((p) => (
      <Link key={p.slug} href={`/portfolio/${p.slug}`} className="glass rounded-2xl p-6 hover:border-gold block">
        <p className="text-gold text-sm">{p.industry}</p><h2 className="text-xl font-semibold mt-1">{p.title}</h2></Link>))}</div></main>);
}
