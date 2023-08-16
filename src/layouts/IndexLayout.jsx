import { AppShell, Header } from '@mantine/core';
import { Outlet, useParams } from 'react-router-dom';
import { HeaderMenu } from '../components/HeaderMenu/ui/HeaderMenu';
import { routes } from '../configs/routes';
import NotFoundPage from '../pages/NotFoundPage';

export default function IndexLayout() {
  const { category } = useParams();
  const isValidCategory = Object.keys(
    routes.categories.nav.variations
  ).includes(category);

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} px="md" withBorder={false}>
          <HeaderMenu />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {category ? (
        !isValidCategory ? (
          <NotFoundPage />
        ) : (
          <Outlet context={{ category, endpoint: category }} />
        )
      ) : (
        <Outlet />
      )}
    </AppShell>
  );
}
