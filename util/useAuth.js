import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '@/util/initAuth';
export const useAuth = () => {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  return { user, loading };
};
