import { call, put, takeEvery } from 'redux-saga/effects';

import { push } from 'connected-react-router';
import {
  setNovaPoshtaCities,
  setNovaPoshtaWarehouse,
  setNovaPoshtaStreets,
  setLoading,
  setNovaPoshtaPrices,
  setFondyData
} from './checkout.actions';

import {
  GET_NOVAPOSHTA_CITIES,
  GET_NOVAPOSHTA_WAREHOUSES,
  GET_NOVAPOSHTA_STREETS,
  GET_NOVAPOSHTA_PRICES,
  GET_FONDY_DATA
} from './checkout.types';
import getItems from '../../utils/client';
import { setError } from '../error/error.actions';

function* handleErrors({ message }) {
  yield put(setError(message));
  yield put(push('/error-page'));
}

export function* handleFondyUrl({ payload }) {
  try {
    const dataFromFondy = yield call(
      getItems,
      `query{
              getPaymentCheckout(data: {
                orderId: "${payload.orderID}",
                orderDesc: "${payload.orderID}",
                currency: "UAH",
                amount: ${payload.amount}
              }){
                paymentId
                checkoutUrl
              }
            }`
    );
    yield put(setFondyData(dataFromFondy.data.getPaymentCheckout));
  } catch (e) {
    yield call(handleErrors, e);
  }
}

export function* handlePrice({ payload }) {
  try {
    const price = yield call(
      getItems,
      `query {
        getNovaPoshtaPrices(data:{
              cityRecipient: "${payload.cityRecipient}"
              weight: ${payload.weight}
              cost: ${payload.cost}
              seatsAmount: 1
              serviceType: "${payload.serviceType}"
                    }){
          cost
          assessedCost
        }
      }`
    );
    yield put(setNovaPoshtaPrices(...price.data.getNovaPoshtaPrices));
  } catch (e) {
    yield call(handleErrors, e);
  }
}

export function* handleStreets({ payload }) {
  try {
    yield put(setLoading(true));
    const streets = yield call(
      getItems,
      `query($cityRef: String, $street: String){
                getNovaPoshtaStreets(cityRef: $cityRef, street: $street){   
                    description
                    ref
                    streetsTypeRef
                    streetsType
                    }
                 }`,
      { cityRef: payload.ref, street: payload.street }
    );
    yield put(setNovaPoshtaStreets(streets.data.getNovaPoshtaStreets));
    yield put(setLoading(false));
  } catch (e) {
    yield call(handleErrors, e);
  }
}

export function* handleCities({ payload }) {
  try {
    yield put(setLoading(true));
    const cities = yield call(
      getItems,
      `query{
               getNovaPoshtaCities(city: "${payload}") {
                  description
                  ref
                     }
                  }`
    );
    yield put(setNovaPoshtaCities(cities.data.getNovaPoshtaCities));
    yield put(setLoading(false));
  } catch (e) {
    yield call(handleErrors, e);
  }
}

export function* handleWarehouse({ payload }) {
  try {
    const warehouses = yield call(
      getItems,
      `query{
                getNovaPoshtaWarehouses(city: "${payload}"){   
                    description
                    ref
                    shortAddress
                    schedule {
                       monday
                       saturday
                       sunday
                     }
                }
            }`
    );
    yield put(setNovaPoshtaWarehouse(warehouses.data.getNovaPoshtaWarehouses));
  } catch (e) {
    yield call(handleErrors, e);
  }
}

export default function* checkoutSaga() {
  yield takeEvery(GET_NOVAPOSHTA_CITIES, handleCities);
  yield takeEvery(GET_NOVAPOSHTA_WAREHOUSES, handleWarehouse);
  yield takeEvery(GET_NOVAPOSHTA_STREETS, handleStreets);
  yield takeEvery(GET_NOVAPOSHTA_PRICES, handlePrice);
  yield takeEvery(GET_FONDY_DATA, handleFondyUrl);
}
