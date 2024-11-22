'use client';

import { useFormState } from 'react-dom';
import { signupAction } from '../action';
import { useActionState } from 'react';

const initialState = {
  message: '',
};

export function SignUpForm() {
  const [state, action] = useActionState(signupAction, initialState);

  return (
    <form action={action} className='flex flex-col gap-2 max-w-sm'>
      <label htmlFor='form-signup.username'>Username</label>
      <input
        id='form-signup.username'
        name='username'
        required
        minLength={4}
        maxLength={31}
      />
      <br />
      <label htmlFor='form-signup.email'>Email</label>
      <input
        type='email'
        id='form-signup.email'
        name='email'
        autoComplete='username'
        required
      />
      <br />
      <label htmlFor='form-signup.password'>Password</label>
      <input
        type='password'
        id='form-signup.password'
        name='password'
        autoComplete='new-password'
        required
      />
      <br />
      <button>Continue</button>
      <p>{state.message}</p>
    </form>
  );
}
