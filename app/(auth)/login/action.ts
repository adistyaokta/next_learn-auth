'use server';

import { getUserFromEmail, getUserPassword } from '@/app/data-access/users';
import { verifyPassword } from '@/app/data-access/utils';
import { createSession, generateSessionToken } from '@/auth';
import { setSessionTokenCookie } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function loginAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get('email');
  const password = formData.get('password');

  const user = await getUserFromEmail(email as string);
  if (user === null) {
    return {
      message: 'Account does not exist',
    };
  }
  const userPassword = await getUserPassword(user.id);
  const validUser = await verifyPassword(password as string, userPassword);
  if (!validUser)
    return {
      message: 'Invalid Password',
    };

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);

  return redirect('/login');
}

interface ActionResult {
  message: string;
}
