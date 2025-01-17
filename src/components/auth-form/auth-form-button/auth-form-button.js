import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './auth-form-button.styles';

const AuthFormButton = ({ onclick, disabled = false, children }) => {
  const styles = useStyles();
  return (
    <Button
      className={styles.authBtn}
      fullWidth
      type='submit'
      disabled={disabled}
      onClick={onclick}
    >
      {children}
    </Button>
  );
};
export default AuthFormButton;
