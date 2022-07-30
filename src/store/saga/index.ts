import { all } from 'redux-saga/effects'

import goalSagas from './goal'
import pinnedGoalSagas from './pinnedGoals'
import userSagas from './user'

export default function* rootSaga() {
    yield all([goalSagas(), pinnedGoalSagas(), userSagas()])
}
