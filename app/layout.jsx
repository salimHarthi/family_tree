'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ConfigProvider, theme } from 'antd';
import { ReactFlowProvider } from 'reactflow';
import NavBar from '@/components/navBar';
import { initFirebase } from '@/util/initAuth';
import Providers from '@/util/providers';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children, session }) {
  initFirebase();
  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <ReactFlowProvider>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <body className='h-screen'>
              <NavBar />
              <div className='pt-14 h-full px-4'>{children}</div>
            </body>
          </ConfigProvider>
        </ReactFlowProvider>
      </SessionProvider>
    </html>
  );
}
