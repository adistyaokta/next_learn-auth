import { getCurrentSession } from '@/lib/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LogoutButton } from './(auth)/components/LogoutButton';

export default async function Home() {
  const { user } = await getCurrentSession();

  // if (user === null) return redirect('/login');

  return (
    <div className='min-h-dvh w-full flex flex-col justify-center items-center gap-5'>
      <h1 className='text-xl uppercase'>Welcome {user ? user.username : ''}</h1>
      {!user ? (
        <div className='flex gap-2'>
          <Link
            href={'/signup'}
            className='min-w-40 text-center bg-white text-slate-700 font-bold uppercase p-4 rounded-md'
          >
            Register
          </Link>
          <Link
            href={'/login'}
            className='min-w-40 text-center bg-white text-slate-700 font-bold uppercase p-4 rounded-md'
          >
            Login
          </Link>
        </div>
      ) : (
        <LogoutButton />
      )}
    </div>
  );
}
