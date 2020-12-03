import React from 'react';
import { useSelector } from 'react-redux';

import { useStyles } from './wishlist.styles';
import FilledWishlist from './filled-wishlist';
import EmptyWishlist from './empty-wishlist';
import { selectWishListList } from '../../redux/selectors/wishlist.selectors';

const Wishlist = () => {
  const wishlistItems = useSelector(selectWishListList);
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {wishlistItems.length ? (
        <FilledWishlist items={wishlistItems} />
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
};

export default Wishlist;
