import { notFound } from 'next/navigation';
import ApiForm from '@/components/FormKit';
import { jobs, getJob } from '@/lib/data';
export const generateStaticParams = () => jobs.map((j) => ({ slug: j.slug }));
export default function Job({ params }) {
  const j = getJob(params.slug); if (!j) notFound();
  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-20"><h1 className="text-4xl font-bold">{j.title}</h1>
      <p className="text-white/60">{j.department} · {j.experience}</p>
      <h3 className="text-gold mt-8 font-semibold">Responsibilities</h3><ul className="list-disc ml-5">{j.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
      <h3 className="text-gold mt-6 font-semibold">Requirements</h3><ul className="list-disc ml-5">{j.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
      <h2 id="apply" className="text-2xl font-bold mt-12 mb-4">Apply</h2>
      <ApiForm endpoint="applications" initial={{ position: j.title }} submitLabel="Submit Application" successMessage="Application received. Good luck!"
        fields={[{ name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'phone', label: 'Phone', required: true },
          { name: 'resumeUrl', label: 'Resume link (Drive/Dropbox URL)', type: 'url', required: true }, { name: 'message', label: 'Message', type: 'textarea' }]} />
    </main>);
}
