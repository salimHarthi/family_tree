'use client';
import React from 'react';
import { useAuth } from '@/util/useAuth';
import { useRouter } from 'next/navigation';
const Layout = ({ children }) => {
  // const { user, loading } = useAuth();
  // const router = useRouter();

  // if (!user) {
  //   return router.push('/login');
  // }
  return children;
};

export default Layout;
