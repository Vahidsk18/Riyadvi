import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
export const metadata = { title: 'Riyadvi Software Technologies', description: 'Custom software & digital solutions to grow your business.' };
export default function RootLayout({ children }) {
  return (<html lang="en" className={inter.variable}><body className="font-sans"><SmoothScroll><Nav />{children}</SmoothScroll></body></html>);
}
