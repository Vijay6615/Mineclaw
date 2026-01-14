import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mineclaw - Drug Prevention & Awareness',
  description: 'Empowering communities to prevent drug abuse through education, awareness, and support',
  keywords: 'drug prevention, substance abuse, addiction help, community resources, drug awareness',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}