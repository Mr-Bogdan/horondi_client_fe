import { takeEvery, call, put } from 'redux-saga/effects';
import { SEND_CHAT_MAIL } from './chat.types';
import { setCommentsLoading, setMessageState } from './chat.actions';
import { sendMail } from './chat.operations';
import { handleUserIsBlocked } from '../../utils/user-helpers';
import { USER_IS_BLOCKED } from '../../configs';

export function* handleSendMail({ payload }) {
  try {
    yield put(setCommentsLoading(true));
    const res = yield call(sendMail, payload);
    if (res?.message === USER_IS_BLOCKED) {
      yield call(handleUserIsBlocked);
    } else {
      yield put(setMessageState(res._id));
      yield put(setCommentsLoading(false));
    }
  } catch (e) {
    yield call(handleChatError, e);
  }
}

function* handleChatError(e) {
  yield put(setMessageState(false));
}

export default function* chatSaga() {
  yield takeEvery(SEND_CHAT_MAIL, handleSendMail);
}
