import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: 'AIzaSyDYdX8tRVAHURdTnDW-ubytNeZuvTn0RzI',
  authDomain: 'family-tree-2f9d9.firebaseapp.com',
  projectId: 'family-tree-2f9d9',
  storageBucket: 'family-tree-2f9d9.appspot.com',
  messagingSenderId: '563077762939',
  appId: '1:563077762939:web:98a9df5da8d342368a77de',
  measurementId: 'G-DRGJBYD50W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const initFirebase = () => {
  return app;
};

if (typeof window !== 'undefined') {
  // Import and initialize Firebase Analytics
  const analytics = getAnalytics();
  // Other Firebase Analytics setup code
}
