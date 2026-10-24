'use client';
import ApiForm from '@/components/FormKit';
import { useState } from 'react';
export default function Guide() {
  const [ok, setOk] = useState(false);
  return (
    <main className="mx-auto max-w-xl px-5 pt-28 pb-20"><h1 className="text-4xl font-bold mb-6">Download <span className="text-gold">Software Project Planning Guide</span></h1>
      <ApiForm endpoint="lead-magnet" submitLabel="Get the Guide" onSuccess={() => setOk(true)} successMessage="Thanks! Your download is ready below." fields={[
        { name: 'name', label: 'Name', required: true }, { name: 'company', label: 'Company', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'phone', label: 'Phone', required: true }]} />
      {ok && <a className="btn btn-gold mt-6" href="/software-project-planning-guide.pdf" download>Download PDF</a>}
    </main>);
}
