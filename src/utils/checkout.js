import PropTypes from 'prop-types';
import i18next from 'i18next';
import { DEFAULT_CURRENCY, deliveryTypes, SESSION_STORAGE } from '../configs';
import { getFromSessionStorage, setToSessionStorage } from '../services/session-storage.service';
import { COURIER } from '../const/checkout';
import { MATERIAL_UI_COLOR } from '../const/material-ui';
import { checkoutPayMethod } from '../containers/checkout/checkout-form/const';

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  paymentMethod: '',
  userComment: '',
  courierOffice: '',
  city: '',
  street: '',
  house: '',
  flat: '',
  region: '',
  district: '',
  regionId: '',
  districtId: '',
  cityId: ''
};

export const checkoutPropTypes = {
  language: PropTypes.number,
  isLightTheme: PropTypes.bool,
  currency: PropTypes.number,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string
    })
  ),
  deliveryType: PropTypes.string,
  values: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    paymentMethod: PropTypes.string,
    userComment: PropTypes.string,
    courierOffice: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    house: PropTypes.string,
    flat: PropTypes.string,
    region: PropTypes.string,
    district: PropTypes.string
  }),
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    paymentMethod: PropTypes.string,
    userComment: PropTypes.string,
    courierOffice: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    house: PropTypes.string,
    flat: PropTypes.string,
    region: PropTypes.string,
    district: PropTypes.string
  }),
  touched: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    paymentMethod: PropTypes.string,
    userComment: PropTypes.string,
    courierOffice: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    house: PropTypes.string,
    flat: PropTypes.string,
    region: PropTypes.string,
    district: PropTypes.string
  })
};

export const checkoutDefaultProps = {
  language: null,
  isLightTheme: false,
  currency: null,
  deliveryType: '',
  cartItems: [],
  values: {},
  errors: {},
  touched: {}
};

const productItemsInput = (cartItems) =>
  cartItems.map((item) => ({
    product: item.product?._id,
    quantity: item.quantity,
    isFromConstructor: !item.product._id,
    price: item.price,
    options: {
      size: item.options.size._id
    }
  }));

export const orderInputData = (data, deliveryType, cartItems) => ({
  recipient: {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber
  },
  delivery: {
    sentBy: deliveryType,
    invoiceNumber: data.invoiceNumber || '',
    courierOffice: data.courierOffice || '',
    region: data.region || '',
    district: data.district || '',
    regionId: data.regionId || '',
    districtId: data.districtId || '',
    cityId: data.cityId || '',
    city: data.city || '',
    street: data.street || '',
    house: data.house || '',
    flat: data.flat || '',
    byCourier:
      deliveryType === deliveryTypes.NOVAPOSTCOURIER ||
      deliveryType === deliveryTypes.UKRPOSTCOURIER
  },
  items: productItemsInput(cartItems),
  paymentMethod:
    data.paymentMethod === checkoutPayMethod.card ? checkoutPayMethod.card : checkoutPayMethod.cash,
  userComment: data.userComment
});

export const checkoutFormBtnValue = (values) =>
  values.paymentMethod === '' || values.paymentMethod === checkoutPayMethod.cash
    ? i18next.t(`checkout.confirmOrder`)
    : i18next.t(`checkout.payOrder`);

export const courierInputLabels = () => [
  {
    name: 'region',
    label: i18next.t(`checkout.checkoutTextFields.region`)
  },
  {
    name: 'district',
    label: i18next.t(`checkout.checkoutTextFields.district`)
  },
  {
    name: 'city',
    label: i18next.t(`checkout.checkoutTextFields.city`)
  },
  {
    name: 'street',
    label: i18next.t(`checkout.checkoutTextFields.street`)
  },
  {
    name: 'house',
    label: i18next.t(`checkout.checkoutTextFields.house`)
  },
  {
    name: 'flat',
    label: i18next.t(`checkout.checkoutTextFields.flat`)
  }
];

export const userNameInputLabels = () => [
  {
    name: 'firstName',
    label: i18next.t(`checkout.checkoutTextFields.firstName`)
  },
  {
    name: 'lastName',
    label: i18next.t(`checkout.checkoutTextFields.lastName`)
  }
];

export const userContactInputLabels = () => [
  {
    name: 'email',
    label: i18next.t(`checkout.checkoutTextFields.email`)
  },
  {
    name: 'phoneNumber',
    label: i18next.t(`checkout.checkoutTextFields.contactPhoneNumber`)
  }
];

export const POSTOMAT = 'Поштомат';
export const POST_OFFICE_NUMBER = 'Відділення № ';

export const getCurrentCurrency = (currency) =>
  currency === DEFAULT_CURRENCY
    ? i18next.t(`checkout.checkoutTitles.UAH`)
    : i18next.t(`checkout.checkoutTitles.USD`);

export const setUserValues = (values, userData, deliveryType) => {
  const { firstName, lastName, email, phoneNumber } = userData;
  const result = { ...values, firstName, lastName, email, phoneNumber };
  if (
    (deliveryType === deliveryTypes.NOVAPOSTCOURIER ||
      deliveryType === deliveryTypes.UKRPOSTCOURIER) &&
    userData.address
  ) {
    const { city, street, buildingNumber: house, appartment: flat } = userData.address;
    return {
      ...result,
      city,
      street,
      house,
      flat
    };
  }
  return result;
};

export const setDeliveryTypeToStorage = (deliveryType) => {
  const typeFromStorage = getFromSessionStorage(SESSION_STORAGE.DELIVERY_TYPE);
  setToSessionStorage(SESSION_STORAGE.DELIVERY_TYPE, deliveryType);
  const checkoutForm = getFromSessionStorage(SESSION_STORAGE.CHECKOUT_FORM);
  if (
    (deliveryType.includes(COURIER) && typeFromStorage.includes(COURIER)) ||
    !typeFromStorage ||
    !checkoutForm
  ) {
    return;
  }
  if (typeFromStorage !== deliveryType) {
    setToSessionStorage(SESSION_STORAGE.CHECKOUT_FORM, {
      ...checkoutForm,
      city: '',
      cityId: '',
      courierOffice: '',
      district: '',
      districtId: '',
      flat: '',
      house: '',
      region: '',
      regionId: '',
      street: '',
      userComment: ''
    });
  }
};

export const getThemeColor = (isLightTheme) =>
  isLightTheme ? MATERIAL_UI_COLOR.PRIMARY : MATERIAL_UI_COLOR.ACTION;

export const handleError = (touched, errors) => touched && !!errors;
