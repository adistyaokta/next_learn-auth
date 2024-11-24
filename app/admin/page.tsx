import React from 'react';
import { getUserById, verifyAdmin } from '../data-access/users';
import { getCurrentSession, getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function admin() {
  const { user } = await getCurrentSession();
  await verifyAdmin();

  return (
    <div className='flex flex-col gap-4'>
      <h1>Admin Page</h1>
      <div>
        <p>Welcome {user?.username}</p>
        <Link href={'/users'}>Users Panel</Link>
      </div>

      <Link href={'/dashboard'}>Dashboard</Link>
    </div>
  );
}
