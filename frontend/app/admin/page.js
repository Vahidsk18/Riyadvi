'use client';
import { useEffect, useState } from 'react';
import { API } from '@/lib/data';

const TYPES = [
    ['contact', 'Enquiries'], ['consultation', 'Consultations'], ['health-checkup', 'Health Checkups'],
    ['lead-magnet', 'Lead Magnet'], ['application', 'Job Applications'],
];

export default function Admin() {
    const [token, setToken] = useState('');
    const [authed, setAuthed] = useState(false);
    const [stats, setStats] = useState({});
    const [type, setType] = useState('contact');
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    const headers = { 'x-admin-token': token };

    async function login(e) {
        e.preventDefault(); setError('');
        const r = await fetch(`${API}/admin/stats`, { headers });
        if (!r.ok) return setError('Invalid token');
        setStats((await r.json()).stats); setAuthed(true);
    }
    async function load(t) {
        const r = await fetch(`${API}/admin/submissions?type=${t}`, { headers });
        if (r.ok) setItems((await r.json()).items);
    }
    useEffect(() => { if (authed) load(type); }, [authed, type]);

    async function setStatus(id, status) {
        await fetch(`${API}/admin/submissions/${id}`, {
            method: 'PATCH',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        load(type);
    }

    if (!authed) return (
        <main className="mx-auto max-w-sm px-5 pt-32">
            <h1 className="text-2xl font-bold mb-4">Admin <span className="text-gold">Login</span></h1>
            <form onSubmit={login} className="space-y-4">
                <input className="input" type="password" placeholder="Admin token" value={token} onChange={(e) => setToken(e.target.value)} />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button className="btn btn-gold w-full">Sign in</button>
            </form>
        </main>
    );

    return (
        <main className="mx-auto max-w-6xl px-5 pt-28 pb-20">
            <h1 className="text-3xl font-bold mb-6">Admin <span className="text-gold">Dashboard</span></h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {TYPES.map(([k, label]) => (
                    <button key={k} onClick={() => setType(k)} className={`glass rounded-xl p-4 text-left ${type === k ? 'border-gold' : ''}`}>
                        <p className="text-3xl font-bold text-gold">{stats[k] || 0}</p>
                        <p className="text-sm text-white/70">{label}</p>
                    </button>
                ))}
            </div>
            <div className="overflow-x-auto glass rounded-xl">
                <table className="w-full text-sm">
                    <thead className="text-left text-gold">
                        <tr>
                            {['Name', 'Email', 'Phone', 'Company', type === 'application' ? 'Position / Resume' : 'Requirement', 'Date', 'Status']
                                .map((h) => <th key={h} className="p-3">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((i) => (
                            <tr key={i._id} className="border-t border-white/10">
                                <td className="p-3">{i.name}</td>
                                <td className="p-3">{i.email}</td>
                                <td className="p-3">{i.phone}</td>
                                <td className="p-3">{i.company || '-'}</td>
                                <td className="p-3">
                                    {type === 'application'
                                        ? <>{i.data?.position} {i.data?.resumeUrl && <a className="text-gold underline" href={i.data.resumeUrl} target="_blank">Resume</a>}</>
                                        : i.data?.requirement || i.data?.message?.slice(0, 40) || '-'}
                                </td>
                                <td className="p-3">{new Date(i.createdAt).toLocaleDateString()}</td>
                                <td className="p-3">
                                    <select className="bg-black border border-white/20 rounded px-2 py-1" value={i.status} onChange={(e) => setStatus(i._id, e.target.value)}>
                                        {['new', 'contacted', 'closed'].map((s) => <option key={s}>{s}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {!items.length && <tr><td className="p-4 text-white/50" colSpan={7}>No submissions yet.</td></tr>}
                    </tbody>
                </table>
            </div>
        </main>
    );
}