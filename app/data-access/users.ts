'use server';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { HashPassword } from './utils';
import crypto from 'crypto';

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

export async function verifyAdmin(id: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (user?.role !== 'ADMIN') return false;
  return true;
}
