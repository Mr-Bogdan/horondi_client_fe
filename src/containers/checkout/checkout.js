import React from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useStyles } from './checkout.styles';
import { CHECKOUT_TITLES } from '../../translations/checkout.translations';
import CheckoutForm from './checkout-form';
import routes from '../../configs/routes';

const Checkout = () => {
  const { language, isLightTheme, currency, cartItems } = useSelector(
    ({ Language, Theme, Currency, Cart }) => ({
      language: Language.language,
      isLightTheme: Theme.lightMode,
      currency: Currency.currency,
      cartItems: Cart.list
    }));
  const styles = useStyles({
    isLightTheme
  });

  return (
    <div className={styles.root}>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutHeader}>
          <div className={styles.checkoutTitleInfo}>
            <div className={styles.checkoutTitleInfoData}>
              <Link to={routes.pathToCart} className={styles.backBtn}>
                <KeyboardBackspaceIcon
                  color={isLightTheme ? 'primary' : 'action'}
                  className={styles.backBtnLine}
                />
              </Link>
              <h2 className={styles.checkoutTitle}>
                {CHECKOUT_TITLES[language].checkoutTitle}
              </h2>
            </div>
            <div className={styles.checkoutTitleLine} />
          </div>
          <div className={styles.checkoutYourOrderTitleData}>
            <h2 className={styles.checkoutTitle}>
              {CHECKOUT_TITLES[language].yourOrderTitle}
            </h2>
            <div className={styles.checkoutTitleLine} />
          </div>
        </div>
        <div className={styles.checkoutMain}>
          <CheckoutForm
            language={language}
            isLightTheme={isLightTheme}
            currency={currency}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
