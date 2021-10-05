import { getCart, setCart, setUserCartItemSize, setCartItemSize } from '../cart.actions';
import { SET_CART, GET_CART, SET_USER_CART_ITEM_SIZE, SET_CART_ITEM_SIZE } from '../cart.types';

describe('setCart action test', () => {
  let type;
  let cartAction;
  const payload = { item: {}, value: 1 };
  const cartItem = {
    id: 1,
    name: 'Garbyz'
  };

  beforeEach(() => {
    type = SET_CART;
    cartAction = setCart(cartItem);
  });

  it('should return object', () => {
    expect(typeof cartAction).toStrictEqual('object');
  });

  it('should to be truthy', () => {
    expect(cartAction).toBeTruthy();
  });

  it('value by key "type" of returned object should to be equal to "SET_CART"', () => {
    expect(cartAction.type).toEqual(type);
  });

  it('value by key "payload.name" of returned object should to be "Garbyz"', () => {
    expect(cartAction.payload.name).toEqual('Garbyz');
  });

  it('value by key "payload.name" of returned object should to be "Horondi"', () => {
    const expectation = { name: 'Horondi' };
    cartAction = setCart(expectation);
    expect(cartAction.payload.name).toEqual('Horondi');
  });

  it('should return expected set cart item size payload', () => {
    cartAction = setCartItemSize(payload.item, payload.value);
    expect(cartAction.payload.value).toBe(payload.value);
  });

  it('should return expected set user cart item size payload', () => {
    cartAction = setUserCartItemSize({}, payload.item, payload.value);
    expect(cartAction.payload.value).toBe(payload.value);
  });
});

describe('get items from cart', () => {
  let type;

  beforeEach(() => {
    type = GET_CART;
  });

  it('should return object', () => {
    expect(typeof getCart()).toStrictEqual('object');
  });

  it('should return object with one key/value "type: GET_CART"', () => {
    expect(getCart()).toStrictEqual({ type: GET_CART });
  });

  it('should to be truthy', () => {
    expect(getCart()).toBeTruthy();
  });

  it('value by key "type" of returned object should to be equal to "GET_CART"', () => {
    expect(getCart().type).toEqual(type);
  });
});
