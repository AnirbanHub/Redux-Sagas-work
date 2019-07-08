export function* fetchItem2() {
  const correlationId = yield select(selectors.retrieveCorrelation);
  const Item2 = yield call(ItemAPI.fetchItem2, correlationId);
  yield put(saveItem2(Item2));
  }
  
  export function* fetchItem1() {
  const correlationId = yield select(selectors.retrieveCorrelation);
  const Item1 = yield call(ItemAPI.fetchItem1, correlationId);
  
  yield put(saveSystemItemCount(Item.systemItemCount));
  yield put(saveItem1(Item.miscellaneousItems));
  yield call(fetchItem3, Item.Item3);
  }
  
  export function* fetchInitialData() {
  try {
  yield all([
  call(fetchItems1),
  call(fetchItems2)
  ]);
  
  yield put(setPageStatus(PAGE_STATUS.MAIN));
  } catch (error) {
  yield put(setPageStatus(PAGE_STATUS.ERROR));
  }
  }
  
  export function* watchFetchItem2() {
  yield takeLatest(actionTypes.FETCH_ACTIVITY_DEFINITIONS, fetchItem2);
  }
  
  export function* watchFetchitem1() {
  yield takeLatest(actionTypes.FETCH_ACTIVITIES, fetchItem1);
  }
  
  export function* watchFetchInitialData() {
  yield takeLatest(actionTypes.FETCH_INITIAL_DATA, fetchInitialData);
  }
  
  export default function* root() {
  yield fork(watchFetchInitialData);
  yield fork(watchFetchItem2);
  yield fork(watchFetchItem1);
  ...
  ...
  ...
  }