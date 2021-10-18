import { all } from 'redux-saga/effects';
import newsSaga from './news/news.sagas';
import categoriesSaga from './categories/categories.sagas';
import productsSaga from './products/products.sagas';
import wishlistSaga from './wishlist/wishlist.sagas';
import cartSaga from './cart/cart.sagas';
import userSaga from './user/user.sagas';
import businessPagesSaga from './business-pages/business-pages.sagas';
import modelSaga from './model/model.sagas';
import commentsSaga from './comments/comments.sagas';
import checkoutSaga from './checkout/checkout.sagas';
import chatSaga from './chat/chat.sagas';
import headerLinksSaga from './header-links/header-links.sagas';
import patternSaga from './pattern/pattern.sagas';
import toastSaga from './toast/toast.sagas';
import { constructorSaga } from './images-constructor/constructor.sagas';
import contactsSaga from './contacts/contacts.sagas';
import orderSaga from './order/order.sagas';

export function* rootSaga() {
  yield all([
    newsSaga(),
    categoriesSaga(),
    userSaga(),
    wishlistSaga(),
    productsSaga(),
    toastSaga(),
    cartSaga(),
    modelSaga(),
    commentsSaga(),
    checkoutSaga(),
    businessPagesSaga(),
    chatSaga(),
    contactsSaga(),
    headerLinksSaga(),
    patternSaga(),
    constructorSaga(),
    orderSaga()
  ]);
}
