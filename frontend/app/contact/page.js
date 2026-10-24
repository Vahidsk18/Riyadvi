import ApiForm from '@/components/FormKit';
export default function Contact() {
  return (
    <main className="mx-auto max-w-xl px-5 pt-28 pb-20"><h1 className="text-4xl font-bold mb-6">Contact <span className="text-gold">Us</span></h1>
      <ApiForm endpoint="contact" submitLabel="Send Message" fields={[
        { name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'phone', label: 'Phone', required: true },
        { name: 'company', label: 'Company' }, { name: 'requirement', label: 'Requirement', type: 'select', options: ['Web Development', 'App Development', 'Digital Marketing', 'AR / VR', '3D Modeling', 'UI/UX Design'] },
        { name: 'message', label: 'Message', type: 'textarea', required: true }]} />
      <div className="mt-8 flex gap-4"><a className="btn btn-ghost" href="https://wa.me/910000000000" target="_blank">WhatsApp</a>
        <a className="btn btn-ghost" href="https://calendly.com/your-link" target="_blank">Book on Calendly</a></div>
    </main>);
}
