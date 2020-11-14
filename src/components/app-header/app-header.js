import React, { useState } from 'react';
import { AppBar, IconButton as BurgerMenu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { useStyles } from './app-header.styles';
import Sidebar from '../../containers/sidebar';
import HeaderRightBar from '../../containers/header-right-bar';

import { LOGO } from '../../configs';

const AppHeader = () => {
  const styles = useStyles();

  const [menu, setMenuOpen] = useState(true);

  return (
    <div className={styles.root}>
      <AppBar position='static' className={styles.header}>
        <Toolbar>
          <BurgerMenu
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </BurgerMenu>
          <Typography variant='h5'>
            <Link to='/' className={styles.logo}>
              {LOGO}
            </Link>
          </Typography>
          <HeaderRightBar />
        </Toolbar>
      </AppBar>
      <Sidebar setMenuOpen={setMenuOpen} menu={menu} />
    </div>
  );
};

export default AppHeader;
