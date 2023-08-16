import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function BackBtn({ children }) {
  const navigate = useNavigate();
  return cloneElement(children, { onClick: () => navigate(-1) });
}

BackBtn.propTypes = { children: PropTypes.node };

export default BackBtn;
