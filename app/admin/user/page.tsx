import { verifyAdmin } from '@/app/data-access/users';
import React from 'react';

export default async function page() {
  await verifyAdmin();

  return <div>user page</div>;
}
