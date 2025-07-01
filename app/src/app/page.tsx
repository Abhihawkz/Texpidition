import prisma from '../lib/prisma';
import WebsiteCard from '../components/user/WebsiteCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const websites = await prisma.website.findMany({
    include: { organization: true },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Explore Websites</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {websites.map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </div>
  );
}