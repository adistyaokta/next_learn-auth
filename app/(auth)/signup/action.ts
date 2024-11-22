'use server';

import { createUser } from '@/app/data-access/users';
import { createSession, generateSessionToken } from '@/auth';
import { setSessionTokenCookie } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function signupAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<any> {
  const email = formData.get('email');
  const username = formData.get('username');
  const password = formData.get('password');

  const user = await createUser({ email, username, password });

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);

  return redirect('/');
}

interface ActionResult {
  message: string;
}
