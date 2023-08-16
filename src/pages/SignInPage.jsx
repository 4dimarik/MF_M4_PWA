import { Paper, Container, Title } from '@mantine/core';
import SignIn from '../components/SignIn';

export default function SignInPage() {
  return (
    <Container size={420} my={40}>
      <Title align="center" sx={{ fontWeight: 900 }}>
        Вход
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <SignIn />
      </Paper>
    </Container>
  );
}
