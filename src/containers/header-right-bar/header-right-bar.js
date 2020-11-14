import React from 'react';
import { useStyles } from './header-right-bar.styles';

import Currency from '../currency';
import Language from '../language';
import CartHeader from '../cart-header';
import Cabinet from '../cabinet';

const HeaderRightBar = ({ fromSideBar }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Currency fromSideBar={fromSideBar} />
      <Language fromSideBar={fromSideBar} />
      <CartHeader fromSideBar={fromSideBar} />
      <Cabinet fromSideBar={fromSideBar} />
    </div>
  );
};

export default HeaderRightBar;
