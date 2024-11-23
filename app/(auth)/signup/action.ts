'use server';

import { createUserAccount } from '@/app/data-access/account';
import { createUser } from '@/app/data-access/users';
import { createSession, generateSessionToken } from '@/auth';
import { setSessionTokenCookie } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function signupAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<any> {
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const user = await createUser({
    email,
    username,
    password,
    id: '',
  });

  const account = await createUserAccount(user.id);

  if (!account) {
    return { message: 'Unable to create account.' };
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);

  return redirect('/dashboard');
}

interface ActionResult {
  message: string;
}
