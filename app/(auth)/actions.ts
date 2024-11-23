'use server';

import { invalidateSession } from '@/auth';
import { deleteSessionTokenCookie, getCurrentSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function logoutAction(): Promise<ActionResult> {
  const { session } = await getCurrentSession();
  if (session === null) {
    return {
      message: 'Not authenticated',
    };
  }
  invalidateSession(session.id);
  deleteSessionTokenCookie();
  redirect('/');
}

interface ActionResult {
  message: string;
}
