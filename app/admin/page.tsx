import React from 'react';
import { getUserById, verifyAdmin } from '../data-access/users';
import { getCurrentSession, getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function admin() {
  const { user, session } = await getCurrentSession();
  if (!user || !session) redirect('/login');

  const isAdmin = await verifyAdmin(user.id);
  if (!isAdmin) redirect('/dashboard');
  return <div>This is admin page {user?.username}</div>;
}
