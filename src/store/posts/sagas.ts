import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { callApi } from '../../utils/api'
import { fetchError } from './actions'
import ActionType from './types'


function* handleFetch(){
    try {
        const res = yield call(callApi, 'get', 'posts')

        if (res.error){
            yield put(fetchError(res.error))
        } else {
            yield put(fetchError(res))
        }  
    }  
    catch (err) {
        if (err instanceof Error && err.stack) {
            yield put(fetchError(err.stack))
        } else {
            yield put(fetchError('An unknown error occured.'))
        }
    }
    
}

function* watchFetchRequest() {
    yield takeEvery(ActionType.FETCH_REQUEST, handleFetch)
  }
    
  function* postsSaga() {
    yield all([fork(watchFetchRequest)])
  }
  
  export default postsSaga