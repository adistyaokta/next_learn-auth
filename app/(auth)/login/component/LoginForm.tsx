'use client';

import { useActionState } from 'react';
import { loginAction } from '../action';

const initialState = {
  message: '',
};

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialState);

  return (
    <form action={action} className='flex flex-col items-center'>
      <label htmlFor='form-login.email'>Email</label>
      <input
        type='email'
        id='form-login.email'
        name='email'
        autoComplete='username'
        required
      />
      <br />
      <label htmlFor='form-login.password'>Password</label>
      <input
        type='password'
        id='form-login.password'
        name='password'
        autoComplete='current-password'
        required
      />
      <br />
      <button className='p-2 bg-[var(--foreground)] rounded-md text-[var(--background)] font-bold uppercase'>
        Continue
      </button>
      <p>{state.message}</p>
    </form>
  );
}
