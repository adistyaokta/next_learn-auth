import { REDIRECT_NO_SESSION } from '@/lib/constant/constant';
import { authGuard } from '@/lib/session';
import Link from 'next/link';
import React from 'react';

export default async function page() {
  await authGuard(REDIRECT_NO_SESSION);
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Link href={'/admin'}>Admin Page</Link>
    </div>
  );
}
