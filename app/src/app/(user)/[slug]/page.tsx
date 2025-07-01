import prisma from '../../../lib/prisma';
import ItemCard from '../../../components/user/ItemCard';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export default async function WebsitePage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const website = await prisma.website.findUnique({
    where: { slug: params.slug },
    include: {
      organization: true,
      items: { where: { status: 'ACTIVE' } },
      images: true,
      banners: true,
    },
  });

  if (!website) return notFound();

  // Record page visit
  await prisma.pageVisit.create({
    data: {
      websiteId: website.id,
      userId: session?.user?.id,
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{website.title}</h1>
      <p className="text-gray-600">{website.description}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {website.items.map((item) => (
            <ItemCard key={item.id} item={item} userId={session?.user?.id} />
          ))}
        </div>
      </div>
    </div>
  );
}