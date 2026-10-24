export const services = [
  { slug: 'web-development', title: 'Web Development', visual: 'browser', tagline: 'Fast, scalable web platforms.',
    problem: 'Slow, outdated sites lose customers.', solution: 'Modern React/Next.js builds engineered for speed and SEO.',
    features: ['Custom web apps', 'E-commerce', 'CMS integration', 'SEO & performance'], useCases: ['Retail', 'Healthcare', 'Education'],
    stack: ['React', 'Next.js', 'Node.js', 'MongoDB'], process: ['Discover', 'Design', 'Build', 'Launch'] },
  { slug: 'app-development', title: 'App Development', visual: 'phone', tagline: 'Mobile apps people love.',
    problem: 'Customers expect a seamless mobile experience.', solution: 'Cross-platform apps with native feel.',
    features: ['iOS & Android', 'Offline mode', 'Push notifications', 'API integration'], useCases: ['Fintech', 'Wellness', 'Logistics'],
    stack: ['React Native', 'Node.js', 'MongoDB'], process: ['Discover', 'Prototype', 'Build', 'Release'] },
  { slug: 'digital-marketing', title: 'Digital Marketing', visual: 'bars', tagline: 'Growth you can measure.',
    problem: 'Traffic without conversions wastes budget.', solution: 'Data-led SEO, ads and content strategy.',
    features: ['SEO', 'Paid campaigns', 'Social media', 'Analytics'], useCases: ['D2C brands', 'Clinics', 'Real estate'],
    stack: ['GA4', 'Meta Ads', 'Google Ads'], process: ['Audit', 'Strategy', 'Execute', 'Optimize'] },
  { slug: 'ar-vr', title: 'AR / VR', visual: 'torus', tagline: 'Immersive experiences.',
    problem: 'Static content fails to engage.', solution: 'AR/VR experiences that let users explore products.',
    features: ['AR product preview', 'VR walkthroughs', 'WebXR'], useCases: ['Real estate', 'Retail', 'Training'],
    stack: ['Three.js', 'WebXR', 'Unity'], process: ['Concept', 'Model', 'Build', 'Deploy'] },
  { slug: '3d-modeling', title: '3D Modeling', visual: 'icosa', tagline: 'Detailed, production-ready 3D.',
    problem: 'Products are hard to show in 2D.', solution: 'Optimized 3D assets for web, AR and print.',
    features: ['Product models', 'Animation', 'Texturing', 'Web-optimized GLB'], useCases: ['Manufacturing', 'Jewelry', 'Architecture'],
    stack: ['Blender', 'Three.js', 'Spline'], process: ['Brief', 'Model', 'Texture', 'Deliver'] },
  { slug: 'ui-ux-design', title: 'UI/UX Design', visual: 'cards', tagline: 'Interfaces that convert.',
    problem: 'Confusing interfaces drive users away.', solution: 'Research-driven design systems and prototypes.',
    features: ['User research', 'Wireframes', 'Design systems', 'Prototypes'], useCases: ['SaaS', 'Mobile apps', 'Dashboards'],
    stack: ['Figma', 'Framer', 'Tailwind'], process: ['Research', 'Wireframe', 'Design', 'Test'] },
];
export const projects = [
  { slug: 'puratap', title: 'Puratap', client: 'Puratap', industry: 'Water Purification', services: ['web-development', 'ui-ux-design'],
    challenge: 'Dated site with low lead flow.', solution: 'Rebuilt as a fast, conversion-focused platform.', tech: ['Next.js', 'Node.js'], results: ['Sample: more enquiries', 'Sample: faster load'], interactive3d: true },
  { slug: 'wanaromah', title: 'Wanaromah Perfumers', client: 'Wanaromah', industry: 'Retail', services: ['web-development', 'digital-marketing'],
    challenge: 'Needed premium online storefront.', solution: 'Luxury e-commerce experience.', tech: ['React', 'MongoDB'], results: ['Sample result'] },
  { slug: 'laxmi-astro-ai', title: 'Laxmi Astro AI', client: 'Laxmi Astro', industry: 'AI / Lifestyle', services: ['app-development'],
    challenge: 'Make astrology guidance accessible.', solution: 'AI-assisted mobile experience.', tech: ['React Native', 'Node.js'], results: ['Sample result'] },
];
export const jobs = [
  { slug: 'full-stack-developer', title: 'Full Stack Developer', department: 'Engineering', designation: 'Developer', experience: '0-2 yrs',
    responsibilities: ['Build features across React and Node', 'Write clean, tested code'], requirements: ['MERN knowledge', 'Git workflow'] },
  { slug: 'ui-ux-designer', title: 'UI/UX Designer', department: 'Design', designation: 'Designer', experience: '1-3 yrs',
    responsibilities: ['Design flows and prototypes'], requirements: ['Figma proficiency', 'Portfolio'] },
  { slug: '3d-artist', title: '3D Artist', department: 'Design', designation: 'Artist', experience: '1-3 yrs',
    responsibilities: ['Create optimized 3D assets'], requirements: ['Blender', 'Texturing'] },
];
export const getService = (s) => services.find((x) => x.slug === s);
export const getProject = (s) => projects.find((x) => x.slug === s);
export const getJob = (s) => jobs.find((x) => x.slug === s);
export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
