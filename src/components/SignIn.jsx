import { useState } from 'react';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useAuth } from '../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

function SignIn() {
  const [data, setData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let isValidForm = true;
    if (data?.username !== 'test') {
      setErrors((prevState) => ({
        ...prevState,
        username: 'Данный Логин не зарегистрирован',
      }));
      isValidForm = false;
    }
    if (data?.password !== 'test123') {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Пароль неверный',
      }));
      isValidForm = false;
    }
    if (isValidForm)
      auth.signin(data?.username, () => {
        navigate(from, { replace: true });
      });
  };

  // sx={{"[&>*:not(:first-child)]:mt-2"}}

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="username"
        value={data?.username}
        onChange={handleChange}
        description="Логин - test"
        label="Логин"
        error={errors?.username}
        required
      />
      <PasswordInput
        name="password"
        value={data?.password}
        onChange={handleChange}
        label={'Пароль'}
        description="Пароль - test123"
        error={errors?.password}
        required
        mt="md"
      />
      <Button fullWidth mt="xl" type="submit">
        Вход
      </Button>
    </form>
  );
}

export default SignIn;
