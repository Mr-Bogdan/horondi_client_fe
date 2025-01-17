import React from 'react';
import { useTranslation } from 'react-i18next';

import { TableCell, TableRow, Tooltip } from '@material-ui/core';
import { useStyles } from './certificate-item.styles';
import CertificateCodeCopy from '../../../images/certificates/certificateCodeCopy';
import CertificateImages from '../../../images/certificates/CertificateImages';

const CertificateItem = ({ item }) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const dateHandler = (date) => date.slice(0, 10).split('-').reverse().join('/');

  return (
    <TableRow className={styles.root} data-cy='certificate-item'>
      <TableCell data-cy='certificate-item-img'>
        <img
          src={CertificateImages[`image${item.value}`]}
          className={styles.itemImg}
          alt='certificate img'
        />
      </TableCell>
      <TableCell data-cy='certificate-item-code'>
        <div className={styles.name}>
          <textarea className={styles.area} type='text' defaultValue={item.name} />
          <Tooltip title={t('certificate.copy')}>
            <button
              className={styles.copyBtn}
              onClick={() => navigator.clipboard.writeText(item.name)}
            >
              <CertificateCodeCopy alt='certificate-copy-icon' className={styles.copyIcon} />
            </button>
          </Tooltip>
        </div>
      </TableCell>
      <TableCell data-cy='certificate-item-price'>
        <div className={styles.price}>
          {item.value}
          {` ${t('certificate.currency')}`}
        </div>
      </TableCell>
      <TableCell data-cy='certificate-item-expiration'>
        <div className={styles.date}>{`${dateHandler(item.dateStart)} - ${dateHandler(
          item.dateEnd
        )}`}</div>
      </TableCell>
      <TableCell data-cy='certificate-item-status'>
        {item.isActivated && <div className={styles.statusGreen}>{t(`certificate.active`)}</div>}
        {item.isUsed && <div className={styles.statusRed}>{t(`certificate.used`)}</div>}
        {item.isUsed === false && item.isActivated === false && (
          <div className={styles.statusBlue}>{t(`certificate.expired`)}</div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CertificateItem;
