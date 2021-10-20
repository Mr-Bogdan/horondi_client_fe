import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SearchBarListItem from '../search-bar-list-item';

const basePrice = 1312;

jest.mock('react-redux');

jest.mock('connected-react-router', () => ({
  push: 0
}));
const mockStore = {
  currency: 0,
  lightMode: true
};
const product = {
  images: { primary: { small: 'test' } },
  name: { 0: { value: 'test' }, 1: { value: 'test' } },
  basePrice: { 0: { value: basePrice, currency: 'test' } }
};
const mockDispatch = jest.fn();

useSelector.mockImplementation(() => mockStore);
useDispatch.mockReturnValue(mockDispatch);

const wrapper = shallow(<SearchBarListItem product={product} />);

describe('Register component tests', () => {
  it('Should render Register', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should display correct price', () => {
    expect(wrapper.find('div.makeStyles-title-4 > div').text()).toContain(basePrice);
  });
});
