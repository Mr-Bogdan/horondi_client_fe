import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { FavoriteBorderOutlined } from '@material-ui/icons';
import { useStyles } from './wishlist-header.styles';
import { WISHLIST_KEY } from '../../configs';
import routes from '../../configs/routes';

const { pathToWishlist } = routes;

const WishlistHeader = () => {
  const styles = useStyles();
  const { wishlistItems } = useSelector(({ CommonStore }) => ({
    wishlistItems: CommonStore.wishlist
  }));

  return (
    <>
      <Link to={pathToWishlist}>
        <IconButton className={styles.root} aria-label={WISHLIST_KEY} tabIndex={-1} disableRipple>
          <Badge badgeContent={wishlistItems.length} color='secondary'>
            <FavoriteBorderOutlined className={styles.svg} />
          </Badge>
        </IconButton>
      </Link>
    </>
  );
};

export default WishlistHeader;
