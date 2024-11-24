import Link from 'next/link';
import React from 'react';

export default function PermissionDenied() {
  return (
    <div>
      <h1>Your account doesnt have permission for this page</h1>
      <Link href={'/dashboard'}>Back to dashboard</Link>
    </div>
  );
}
