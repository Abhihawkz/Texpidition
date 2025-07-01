import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, description, price, websiteId } = await req.json();
  const item = await prisma.item.create({
    data: { name, description, price, websiteId, status: 'ACTIVE' },
  });

  return NextResponse.json(item, { status: 201 });
}