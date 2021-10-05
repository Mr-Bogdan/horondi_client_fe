import React from 'react';
import { configure, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';

import CartItem from '../cart-item';
import { props, item } from './cart-item.variables';

configure({ adapter: new Adapter() });

let wrapper;

function spyOnSelector(lightMode, loading) {
  jest.spyOn(reactRedux, 'useSelector').mockImplementation((cb) =>
    cb({
      Language: { language: 0 },
      Currency: { currency: 0 },
      Cart: { list: [], loading, quantityLoading: loading, totalPrice: 100 },
      User: { userData: {} },
      Theme: { lightMode }
    })
  );
}

describe('Filled cart component tests', () => {
  beforeAll(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((cb) => cb());
    jest.spyOn(React, 'useCallback').mockImplementation((cb) => cb());
    jest.spyOn(React, 'useState').mockImplementation(() => [true, () => null]);
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => (cb) => cb());
  });
  it('should match snapshot', () => {
    spyOnSelector(true, false);

    wrapper = mount(
      <BrowserRouter>
        <CartItem {...props} />
      </BrowserRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should cover other branches', () => {
    spyOnSelector(false, false);
    item.product.bottomMaterial = { material: { name: [{ value: 'value' }] } };

    wrapper = mount(
      <BrowserRouter>
        <CartItem {...props} user={null} cartQuantityLoading />
      </BrowserRouter>
    );
  });
});
