import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar session={session} />
        {children}
        <Footer />
      </body>
    </html>
  );
}