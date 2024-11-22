import Link from 'next/link';
import React from 'react';
import { LoginForm } from './component/LoginForm';
import { getCurrentSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function page() {
  const { session } = await getCurrentSession();
  if (session !== null) {
    return redirect('/');
  }
  return (
    <>
      <h1>Sign in</h1>
      <LoginForm />
      <Link href='/signup'>Create an account</Link>
      <Link href='/forgot-password'>Forgot password?</Link>
    </>
  );
}
