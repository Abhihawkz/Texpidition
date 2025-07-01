import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prisma';
import { redirect } from 'next/navigation';
import Dashboard from '../../../components/admin/Dashboard';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/api/auth/signin');
  }

  const organization = await prisma.organization.findFirst({
    where: { adminId: parseInt(session.user.id) },
    include: { website: { include: { items: true, visits: true } } },
  });

  if (!organization) {
    redirect('/admin/setup');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <Dashboard organization={organization} />
    </div>
  );
}