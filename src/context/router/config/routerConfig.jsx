import { lazy } from 'react';
import { routes } from '../routes';
import IndexLayout from '../../../layouts/IndexLayout';
const MainPage = lazy(() => import('../../../pages/MainPage'));
const CategoryPage = lazy(() => import('../../../pages/CategoryPage'));
const CategoryItemPage = lazy(() => import('../../../pages/CategoryItemPage'));
const SignInPage = lazy(() => import('../../../pages/SignInPage'));
const NotFoundPage = lazy(() => import('../../../pages/NotFoundPage'));

const routerConfig = [
  {
    path: routes.main.path,
    element: <IndexLayout />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: ':category',
        element: <CategoryPage />,
        authOnly: true,
        suspense: true,
      },
      {
        path: ':category/:id',
        element: <CategoryItemPage />,
        authOnly: true,
        suspense: true,
      },
    ],
  },
  {
    path: '/login',
    element: <SignInPage />,
    suspense: true,
  },
  {
    path: '404',
    element: <NotFoundPage />,
    suspense: true,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    suspense: true,
  },
];

export { routerConfig };
