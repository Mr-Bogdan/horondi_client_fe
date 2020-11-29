import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './login.styles';
import { LOGIN_USER_DATA, formRegExp, errorMessages } from '../../configs';
import {
  placeholders,
  OR_TEXT,
  LOGIN_FORM_LABEL,
  FORGOT_PASSWORD,
  REGISTER_PROPOSAL,
  LOGIN_USER_ERROR,
  STAY_SIGNED_IN
} from '../../translations/user.translations';
import {
  loginByGoogle,
  loginUser,
  resetState
} from '../../redux/user/user.actions';
import { endAdornment } from '../../utils/eyeToggle';
import { Loader } from '../../components/loader/loader';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const styles = useStyles();
  const [shouldValidate, setShouldValidate] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const { loginError, userLoading, language } = useSelector(
    ({ User, Language }) => ({
      loginError: User.error,
      userLoading: User.userLoading,
      language: Language.language
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  const handleLogin = (user) => {
    dispatch(loginUser({ user }));
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(errorMessages[language].value.email)
      .required(' '),
    password: Yup.string()
      .matches(formRegExp.password, errorMessages[language].value.password)
      .required(' '),
    staySignedIn: Yup.bool()
  });

  useEffect(() => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
      });
    });
  }, []);

  const singIn = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signIn().then((googleUser) => {
      const idToken = googleUser.getAuthResponse().id_token;
      dispatch(loginByGoogle({ idToken }));
    });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={LOGIN_USER_DATA}
      onSubmit={handleLogin}
      validateOnChange={shouldValidate}
      validateOnBlur={shouldValidate}
    >
      {({ values, errors, isValid }) => (
        <div className={styles.login}>
          <div className={styles.loginWrapper}>
            <Form className={styles.loginForm}>
              {userLoading ? (
                <Loader />
              ) : (
                <>
                  <h2 className={styles.heading}>
                    {LOGIN_FORM_LABEL[language].value}
                  </h2>
                  <Field
                    as={TextField}
                    label={placeholders.email[language].value}
                    className={`${styles.emailInput} ${
                      values.email ? styles.afterText : ''
                    }`}
                    fullWidth
                    variant='outlined'
                    type='text'
                    name='email'
                    color='primary'
                    error={!!errors.email}
                    helperText={!!errors.email && `${errors.email}, `}
                  />
                  <Field
                    as={TextField}
                    label={placeholders.password[language].value}
                    className={styles.passwordInput}
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='password'
                    InputProps={endAdornment(showPassword, setShowPassword)}
                    name='password'
                    error={!!errors.password}
                    helperText={errors.password || ''}
                  />
                  <div className={styles.recoveryContainer}>
                    <Link to='/recovery' className={styles.recoveryBtn}>
                      {FORGOT_PASSWORD[language].value}
                    </Link>
                  </div>
                  <div className={styles.loginGroup}>
                    <Button
                      className={styles.loginBtn}
                      fullWidth
                      type='submit'
                      onClick={() => setShouldValidate(true)}
                    >
                      {LOGIN_FORM_LABEL[language].value}
                    </Button>
                    {loginError ? (
                      <p className={styles.loginError}>
                        {LOGIN_USER_ERROR[loginError] && loginError
                          ? LOGIN_USER_ERROR[loginError][language].value
                          : LOGIN_USER_ERROR.DEFAULT_ERROR[language].value}
                      </p>
                    ) : null}
                  </div>
                  <div className={styles.orContainer}>
                    <span className={styles.orText}>
                      {OR_TEXT[language].value}
                    </span>
                  </div>
                  <Button
                    className={styles.googleBtn}
                    onClick={singIn}
                    fullWidth
                  >
                    <span className={styles.googleLogo} />
                    Google
                  </Button>
                  <div className={styles.container}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name='staySignedIn'
                          color='primary'
                          checked={values.staySignedIn}
                        />
                      }
                      label={
                        <Typography className={styles.text}>
                          {STAY_SIGNED_IN[language].value}
                        </Typography>
                      }
                    />
                  </div>
                  <div className={styles.registerContainer}>
                    <Link to='/register' className={styles.registerBtn}>
                      {REGISTER_PROPOSAL[language].value}
                    </Link>
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
