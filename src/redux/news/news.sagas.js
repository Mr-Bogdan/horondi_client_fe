import { takeEvery, call, put } from 'redux-saga/effects';
import { setNews } from './news.actions';
import getItems from '../../services/getItems';
import { GET_NEWS } from './news.types';

function* handleNewsLoad() {
  try {
    const news = yield call(
      getItems,
      `query{
         getAllNews{
           _id
           title {
             value
           }
           author{
             name{
             value
             }
             image{
             small
                  }
                }
                text{
                  value
                }
                date
                images{
                  primary{
                    medium
                  }
                }
               }
             }`
    );
    yield put(setNews(news.data.data.getAllNews));
  } catch (error) {
    console.log(error);
  }
}

export default function* getNews() {
  yield takeEvery(GET_NEWS, handleNewsLoad);
}
