import { createContext } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setValue, removeValue] = useLocalStorage({
    key: 'user',
    defaultValue: null,
  });

  const signin = (newUser, callback) => {
    setValue(newUser);
    callback();
  };

  const signout = (callback) => {
    removeValue();
    callback();
  };

  const value = {
    user,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node };

export { AuthProvider, AuthContext };
