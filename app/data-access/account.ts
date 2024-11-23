import prisma from '@/lib/prisma';
import { Account } from '@prisma/client';

export async function createUserAccount(userId: string) {
  // TODO: IMPLEMENT OAUTH
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const account = await prisma.account.create({
    data: {
      userId: user.id,
    },
  });

  return account;
}
