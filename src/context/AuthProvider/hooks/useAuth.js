import { useContext } from 'react';
import { AuthContext } from '../ui/AuthProvider';

export function useAuth() {
  return useContext(AuthContext);
}
