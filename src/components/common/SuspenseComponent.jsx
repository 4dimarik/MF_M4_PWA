import { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@mantine/core';

function SuspenseComponent({ children }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

SuspenseComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { SuspenseComponent };
