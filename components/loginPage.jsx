'use client';
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  //   const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  //   if (user) {
  //     router.push('/dashboard');
  //     return <div>Loading...</div>;
  //   }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };
  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-purple-700 uppercase'>
          Sign in
        </h1>
        <form className='mt-6'>
          <div className='mb-2'>
            <label
              for='email'
              className='block text-sm font-semibold text-gray-800'
            >
              Email
            </label>
            <input
              type='email'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mb-2'>
            <label
              for='password'
              className='block text-sm font-semibold text-gray-800'
            >
              Password
            </label>
            <input
              type='password'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <a href='#' className='text-xs text-purple-600 hover:underline'>
            Forget Password?
          </a>
          <div className='mt-6'>
            <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'>
              Login
            </button>
          </div>
        </form>
        <div className='relative flex items-center justify-center w-full mt-6 border border-t'>
          <div className='absolute px-5 bg-white'>Or</div>
        </div>
        <div className='flex mt-4 gap-x-2'>
          <button
            className='flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600'
            onClick={signIn}
          >
            <svg
              class='h-8 w-8 text-black'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              stroke-width='2'
              stroke='currentColor'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' />
              <path d='M17.788 5.108A9 9 0 1021 12h-8' />
            </svg>
          </button>
        </div>

        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          Don't have an account?
          <a href='#' className='font-medium text-purple-600 hover:underline'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
