import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DoneIcon from '@material-ui/icons/Done';
import { Checkbox, TableCell, TableRow } from '@material-ui/core';

import { useStyles } from './cart-item.styles';
import { CART_TABLE_FIELDS } from '../../../../translations/cart.translations';
import NumberInput from '../../../../components/number-input';
import {
  setCartItemChecked,
  setCartItemQuantity,
  changeCartItemUserQuantity
} from '../../../../redux/cart/cart.actions';
import { IMG_URL } from '../../../../configs';

const CartItem = ({ item, language, currency, calcPrice, isCartEditing }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ User }) => User.userData);
  const styles = useStyles({ image: `${IMG_URL}${item.product.images.primary.small}` });
  const [checkedItem, setCheckedItem] = useState(false);

  const onChangeQuantity = (value) => {
    if (user) {
      dispatch(changeCartItemUserQuantity({ item, value, userId: user._id }));
    } else {
      dispatch(setCartItemQuantity(item, +value));
    }
  };
  const onCartItemCheck = () => {
    setCheckedItem(!checkedItem);
    dispatch(setCartItemChecked(item, checkedItem));
  };

  useEffect(() => {
    dispatch(setCartItemChecked(item, true));
  }, []);

  return (
    <TableRow classes={{ root: styles.root }} data-cy='cart-item'>
      <TableCell classes={{ root: styles.image }} data-cy='cart-item-img'>
        <Link to={`/product/${item.product._id}`}>
          <b />
        </Link>
      </TableCell>
      <TableCell classes={{ root: styles.description }} data-cy='cart-item-description'>
        <Link to={`/product/${item.product._id}`}>
          <span className={styles.itemName}>{item.product.name[language].value}</span>
        </Link>
        {item.options.size && (
          <div>
            {CART_TABLE_FIELDS[language].size}: {item.options.size.name}
          </div>
        )}
        {item.product.bottomMaterial && (
          <div>
            {CART_TABLE_FIELDS[language].bottomMaterial}:
            <br />
            {item.product.bottomMaterial.material.name[language].value}
          </div>
        )}
        {false && (
          <div>
            {CART_TABLE_FIELDS[language].sidePocket}: <DoneIcon className={styles.doneIcon} />
          </div>
        )}
      </TableCell>
      <TableCell>
        <NumberInput quantity={item.quantity} onChangeQuantity={onChangeQuantity} />
      </TableCell>
      <TableCell classes={{ root: styles.price }}>
        <span>{calcPrice(item, currency) / 100}</span>
        {isCartEditing && (
          <Checkbox
            className={styles.checkbox}
            color='default'
            checked={checkedItem}
            onChange={onCartItemCheck}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
