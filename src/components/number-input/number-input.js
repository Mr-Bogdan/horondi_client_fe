import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';

import { useStyles } from './number-input.styles';

const NumberInput = ({ onChangeQuantity, quantity }) => {
  const styles = useStyles();

  return (
    <div className={styles.root} data-cy='cart-item-quantity'>
      <Button
        className={styles.button}
        onClick={() => onChangeQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        <RemoveIcon />
      </Button>
      <h3>{quantity}</h3>
      <Button
        className={styles.button}
        onClick={() => onChangeQuantity(quantity + 1)}
      >
        <AddIcon />
      </Button>
    </div>
  );
};

export default NumberInput;
