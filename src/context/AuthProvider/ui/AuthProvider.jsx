import { createContext, useEffect } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import PropTypes from 'prop-types';
import { Loader, Flex } from '@mantine/core';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setValue, removeValue] = useLocalStorage({
    key: 'user',
  });
  useEffect(() => {
    if (user === undefined) setValue(null);
  }, [user]);

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

  const element =
    user === undefined ? (
      <Flex justify="center">
        <Loader variant="bars" />
      </Flex>
    ) : (
      children
    );

  return <AuthContext.Provider value={value}>{element}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node };

export { AuthProvider, AuthContext };
