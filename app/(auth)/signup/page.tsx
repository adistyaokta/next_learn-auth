import Link from 'next/link';
import React from 'react';
import { SignUpForm } from './component/SignUpForm';

export default function page() {
  return (
    <>
      <h1>Create an account</h1>
      <p>
        Your username must be at least 3 characters long and your password must
        be at least 8 characters long.
      </p>
      <SignUpForm />
      <Link href='/login'>Sign in</Link>
    </>
  );
}
