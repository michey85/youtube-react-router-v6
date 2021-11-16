import { useContext } from 'react';
import { AuthContext } from '../hoc/AuthProvider';

export function useAuth() {
    return useContext(AuthContext);
}
