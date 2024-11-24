import Link from 'next/link';
import React from 'react';
import { SignUpForm } from './component/SignUpForm';
import { getCurrentSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function page() {
  const { session } = await getCurrentSession();
  if (session !== null) {
    return redirect('/dashboard');
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1>Create an account</h1>
      <p>
        Your username must be at least 3 characters long and your password must
        be at least 8 characters long.
      </p>
      <SignUpForm />
      <Link href='/login'>Sign in</Link>
    </div>
  );
}
