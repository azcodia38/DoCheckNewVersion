import { createStore, combineReducers, applyMiddleware } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import StoreData from './types'
import { userReducer } from 'store/data/user'
import { goalsReducer } from 'store/data/goals'
import { connectionReducer } from 'store/data/connection'
import { pendingRequestReducer } from 'store/data/pending-request'
import TaskReducer from 'src/store/reducer/task'
import rootSaga from 'src/store/saga'
import GoalsReducer from 'src/store/reducer/goal'
import PinnedGoalsReducer from 'src/store/reducer/pinnedGoal'
import OfflineModeReducer from 'src/store/reducer/offlineMode'
import UserTrackingReducer from 'src/store/reducer/userTracking'

const reducer = combineReducers<StoreData>({
    user_login_data: userReducer,
    goals_data: goalsReducer,
    connection: connectionReducer,
    pending_request: pendingRequestReducer,
    task: TaskReducer,
    myGoals: GoalsReducer,
    myPinnedGoals: PinnedGoalsReducer,
    offlineMode: OfflineModeReducer,
    userTracking: UserTrackingReducer,
})

// Middleware: Redux Persist Config
const persistConfig = {
    key: 'docheck-local-storage',
    storage: AsyncStorage,
    timeout: undefined,
}

// Enhancher

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducer)

// Saga: Setup saga middleware
const sagaMiddleware = createSagaMiddleware()

// Redux: Store
const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
    // applyMiddleware(
    //   createLogger(),
    // ),
)

sagaMiddleware.run(rootSaga)

// Middleware: Redux Persist Persister
let persistor = persistStore(store)
// Exports
export { store, persistor }
