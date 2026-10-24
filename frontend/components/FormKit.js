'use client';
import { useState } from 'react';
import { API } from '@/lib/data';

// Reusable form: fields = [{name,label,type,required,options}]
export default function ApiForm({ endpoint, fields, submitLabel = 'Submit', successMessage = 'Thank you! We will be in touch.', onSuccess, initial = {} }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const set = (name) => (e) => setValues({ ...values, [name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setState('loading'); setErrors({});
    try {
      const res = await fetch(`${API}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const json = await res.json();
      if (!res.ok) {
        setErrors(Object.fromEntries((json.errors || []).map((x) => [x.field, x.message])));
        setState('error'); return;
      }
      setState('done'); onSuccess?.(json);
    } catch { setState('error'); setErrors({ _: 'Network error. Please try again.' }); }
  }
  if (state === 'done') return <p className="glass rounded-xl p-6 text-gold">{successMessage}</p>;
  return (
    <form onSubmit={submit} className="space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <label className="block text-sm mb-1">{f.label}{f.required && ' *'}</label>
          {f.type === 'textarea'
            ? <textarea className="input" rows={4} required={f.required} onChange={set(f.name)} />
            : f.type === 'select'
              ? <select className="input" required={f.required} onChange={set(f.name)}><option value="">Select</option>{f.options.map((o) => <option key={o} className="text-black">{o}</option>)}</select>
              : <input className="input" type={f.type || 'text'} required={f.required} onChange={set(f.name)} />}
          {errors[f.name] && <p className="text-red-400 text-sm mt-1">{errors[f.name]}</p>}
        </div>
      ))}
      {errors._ && <p className="text-red-400 text-sm">{errors._}</p>}
      <button disabled={state === 'loading'} className="btn btn-gold w-full">{state === 'loading' ? 'Sending…' : submitLabel}</button>
    </form>
  );
}
