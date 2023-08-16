import { SuspenseComponent } from '../../../components/common/SuspenseComponent';
import { PrivateRoute } from '../ui/PrivateRoute';

function privateRoute(element) {
  return this ? <PrivateRoute>{element}</PrivateRoute> : element;
}

function suspenseFunc(element) {
  return this ? <SuspenseComponent>{element}</SuspenseComponent> : element;
}

export { privateRoute, suspenseFunc };
