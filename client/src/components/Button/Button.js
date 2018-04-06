import React from 'react';
import styles from './styles';

const Button = props => (
  <div style={styles.main} onClick={() => props.handler()}>
    {props.children}
  </div>
);

Button.defaultProps = {
  handler: () => {}
};

export default Button;
