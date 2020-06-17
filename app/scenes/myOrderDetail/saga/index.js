import { call, put } from 'redux-saga/effects'
import { getCartDetailsRequest } from 'services/orderService'
import ExampleScreenAction from 'scenes/cartScreen/store/actions'

function* fetchExample() {
  yield put(ExampleScreenAction.fetchExampleLoading())
  try {
    const json = yield call(getCartDetailsRequest)
    if (json) {
      if (json.Data) {
        yield put(ExampleScreenAction.fetchExampleSuccess(json.Data))
      }
    }
  } catch (error) {
    yield put(ExampleScreenAction.fetchExampleFailure(error))
  }
}

export { fetchExample }
