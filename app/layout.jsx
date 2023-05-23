'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ConfigProvider, theme } from 'antd';
import { ReactFlowProvider } from 'reactflow';
import NavBar from '@/components/navBar';
import { initFirebase } from '@/util/initAuth';
import Providers from '@/util/providers';
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  initFirebase();
  return (
    <html lang='en'>
      <Providers>
        <ReactFlowProvider>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <body>
              <div className='mt-8'>
                <NavBar />
              </div>
              <div className='p-5'>{children}</div>
            </body>
          </ConfigProvider>
        </ReactFlowProvider>
      </Providers>
    </html>
  );
}
