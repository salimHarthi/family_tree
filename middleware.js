export { default } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// export default withAuth(
//   function middleware(req) {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized({ token }) {
//         return true;
//       },
//     },
//   }
// );

export const config = {
  matcher: ['/my-family/:path*', '/api/my/:path*'],
};
