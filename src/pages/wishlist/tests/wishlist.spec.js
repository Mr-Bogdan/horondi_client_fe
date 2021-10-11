import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Wishlist from '../wishlist';
import EmptyWishlist from '../empty-wishlist';

jest.mock('../wishlist.styles', () => ({ useStyles: () => ({}) }));
jest.mock('react-redux');
jest.mock('../../../services/local-storage.service');

const dispatch = jest.fn();
const state = {
  isLightTheme: true,
  language: 0,
  loading: false
};

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(() => state);

let wrapper;

describe('Wishlist component tests', () => {
  beforeEach(() => {
    wrapper = shallow(<Wishlist />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('Should render Wishlist', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should render Empty-Wishlist if there are no items', () => {
    expect(wrapper.exists(EmptyWishlist)).toBe(true);
  });
});
