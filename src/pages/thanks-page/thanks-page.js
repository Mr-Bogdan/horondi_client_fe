import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import { parse } from 'query-string';
import { orderDataToLS } from '../../utils/order';
import { useStyles } from './thanks-page.styles';
import OrderData from './order-data';
import { getOrder, getPaidOrder } from '../../redux/order/order.actions';
import routes from '../../const/routes';
import { resetCart, cleanUserCart } from '../../redux/cart/cart.actions';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { ORDER_PAYMENT_STATUS } from '../../utils/thank-you';
import { Loader } from '../../components/loader/loader';

const { pathToMain } = routes;

const ThanksPage = () => {
  const router = useLocation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const language = i18n.language === 'ua' ? 0 : 1;

  const { currency, order, loading, paidOrderLoading, user } = useSelector(
    ({ Currency, Order, User }) => ({
      currency: Currency.currency,
      order: Order.order,
      loading: Order.loading,
      paidOrderLoading: Order.paidOrderLoading,
      user: User.userData
    })
  );

  const styles = useStyles();
  const paymentMethod = getFromLocalStorage(orderDataToLS.paymentMethod);

  useEffect(() => {
    if (user) {
      dispatch(cleanUserCart(user._id));
    } else {
      dispatch(resetCart());
    }

    const { order_id: paidOrderNumber } = parse(router.search);

    if (paidOrderNumber) {
      dispatch(getPaidOrder(paidOrderNumber));
    } else {
      dispatch(getOrder());
    }
  }, []);

  if (loading || paidOrderLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.thanksContainer}>
      {!order && <Redirect to={pathToMain} /> &&
        paymentMethod !== t('checkout.checkoutPayment.card')}
      {(!loading || !paidOrderLoading) && (
        <>
          <h2 className={styles.thunksTitle}>{t('thanksPage.thanksPageTitle.thanks')}</h2>
          <div className={styles.thunksInfo}>
            <OrderData order={order} language={language} currency={currency} />
          </div>
          {order?.paymentStatus === ORDER_PAYMENT_STATUS.PROCESSING && (
            <a
              target='_blank'
              rel='noreferrer'
              className={styles.linkToPayment}
              href={order?.paymentUrl}
            >
              {t('thanksPage.thanksPageTitle.linkToPayment')}
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default ThanksPage;
