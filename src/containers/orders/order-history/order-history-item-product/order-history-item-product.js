import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@material-ui/styles';
import { useStyles } from './order-history-item-product.styles';
import { getCurrencySign } from '../../../../utils/currency';
import { IMG_URL } from '../../../../configs';
import productPlugDark from '../../../../images/product-plug-dark-theme-img.png';
import productPlugLight from '../../../../images/product-plug-light-theme-img.png';

const OrderHistoryItemProduct = ({ item, currency }) => {
  const styles = useStyles();
  const currencySign = getCurrencySign(currency);
  const fixedPriceProduct = item.fixedPrice[currency].value;
  const { t } = useTranslation();
  const { palette } = useTheme();

  const isLightTheme = palette.type === 'light';

  const plugImage = isLightTheme ? productPlugLight : productPlugDark;

  return (
    <>
      <TableRow className={styles.root}>
        <TableCell className={styles.image}>
          <img
            src={item.product ? `${IMG_URL}${item.product.images.primary.thumbnail}` : plugImage}
            alt='img-product'
            className={styles.imgItem}
          />
        </TableCell>
        <TableCell className={styles.description}>
          <p className={styles.productName}>
            {item.product ? t(`${item.product?.translationsKey}.name`) : t('product.notAvailable')}
          </p>
          <p className={styles.productBottom}>
            {item.product && t('cart.bottomMaterial')} -{' '}
            {item.product && t(`${item.product.bottomMaterial.material.translationsKey}.name`)}
          </p>
        </TableCell>
        <TableCell className={styles.description}>{item.options.size.name}</TableCell>
        <TableCell className={styles.description}>
          <FontAwesomeIcon icon={currencySign} />
          {fixedPriceProduct}
        </TableCell>
        <TableCell className={styles.description}>{item.quantity}</TableCell>
        <TableCell className={styles.description}>
          <FontAwesomeIcon icon={currencySign} />
          {item.quantity * fixedPriceProduct}
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderHistoryItemProduct;
