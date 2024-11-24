'use server';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { HashPassword } from './utils';
import crypto from 'crypto';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { PERMISSION_DENIED } from '@/lib/constant/constant';

export async function createUser(data: Partial<User>) {
  const { email, password, username } = data;

  if (!email || !password || !username) {
    throw new Error('Email, password, and username are required');
  }

  const hash = await HashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      username,
    },
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function getUserFromEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return user;
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function updateUser(id: string, data: Partial<User>) {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return updatedUser;
}

export async function getUserPassword(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('Invalid user');
  }

  return user.password;
}

export async function verifyAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/login');

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser?.id,
    },
  });

  if (user?.role !== 'ADMIN') {
    redirect(PERMISSION_DENIED);
  }
  return true;
}
