import { useRoutes } from 'react-router-dom';
import { routerConfig } from '../config/routerConfig';
import { useCallback } from 'react';
import compose from 'compose-function';
import { privateRoute, suspenseFunc } from '../helpers/elementWrappers';

export function AppRouter() {
  const routeWrapper = useCallback(
    ({ path, element, index, children, authOnly, suspense }) => {
      const _route = { path };

      if (element) {
        _route.element = compose(
          privateRoute.bind(authOnly),
          suspenseFunc.bind(suspense)
        )(element);
      }

      if (index) {
        _route.index = true;
      }

      if (children) {
        _route.children = children.map((childrenRoute) =>
          routeWrapper(childrenRoute)
        );
      }

      return _route;
    },
    []
  );

  const routes = routerConfig.map((route) => routeWrapper(route));
  return useRoutes(routes);
}
