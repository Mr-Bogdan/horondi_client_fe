import {
  SET_CART,
  GET_CART,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SET_CART_ITEM_QUANTITY,
  SET_CART_ITEM_CHECKED
} from './cart.types';

const setCart = (cartItems) => ({
  type: SET_CART,
  payload: cartItems
});

const getCart = () => ({
  type: GET_CART
});

const addItemToCart = (item) => ({
  type: ADD_ITEM_TO_CART,
  payload: item
});

const removeItemFromCart = (item) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: item
});

const setCartItemQuantity = (item, value) => ({
  type: SET_CART_ITEM_QUANTITY,
  payload: {
    item,
    value
  }
});
const setCartItemChecked = (item, isChecked) => {
  console.log(item, isChecked);
  return {
    type: SET_CART_ITEM_CHECKED,
    payload: item
  };
};

export {
  setCart,
  getCart,
  addItemToCart,
  removeItemFromCart,
  setCartItemQuantity,
  setCartItemChecked
};
