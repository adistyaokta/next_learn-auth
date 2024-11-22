'use server';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export async function createUser(data: any) {
  const { email, password, username } = data;
  const user = await prisma.user.create({
    data: {
      email,
      password,
      username,
    },
  });

  return user;
}

export async function getUserById(id: number) {
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

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function updateUser(id: number, data: Partial<User>) {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return updatedUser;
}

export async function verifyPassword(email: string, plainPassword: string) {
  const user = await getUserFromEmail(email);

  if (!user) return false;

  // const account = await getAccountById(user.id);

  // if (!account) return false;

  // const salt = account.salt;
  // const savedPassword = account.password;

  // if (!salt || !savedPassword) return false;

  // const hash = await hashPassword(plainPassword, salt);
  // return account.password === hash;
}

export async function getUserPassword(userId: number) {
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
