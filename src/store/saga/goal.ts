/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import {
    call,
    put,
    takeEvery,
    takeLatest,
    takeLeading,
} from 'redux-saga/effects'
import { isFunction, omit } from 'lodash'

import { apiCall } from 'src/api/axiosApiCallWrapper'
import { serviceUrl } from 'src/api/serviceURL'

import * as Types from 'src/store/types'
import * as Actions from 'src/store/actions'
import {
    AddingTaskAPI,
    AnotherUserGoalAPI,
    DeleteSingleTask,
    FetchTaskAPI,
    GoalGroupAPI,
    MemberGoalType,
    MergeReponseCheckedHandler,
    PayloadResponse,
    PinGoalType,
    SagaResponse,
    Spread,
    SubmitGoalDetailAPI,
    TickHandler,
    UpdateTaskAPI,
} from 'src/utils/types'
import {
    CreateGoalRequest,
    PaginationGoalResult,
    TaskCreateGoalRequest,
} from 'src/api/my-goal'
import goalDataSendingTransform from 'src/utils/module/goalDataSendingTransform'
import taskDataSendingTransform from 'src/utils/module/taskDataSendingTransform'
import { Task } from 'src/entity/Task.entity'
import { Goals } from 'src/entity/Goals.entity'
import { createGoalLocal, updateGoalLocal } from 'api-fallback/my-goal'
import { OfflineModeState } from 'store/types'
import { createTaskLocal } from 'api-fallback/task'
import { transformUpdateTaskDateTime } from 'src/utils/module/goal'

function* getTickHandler({ payload }: SagaResponse<TickHandler>): any {
    yield put(Actions.setTickHandler(payload))
    yield put(
        Actions.syncPinnedGoal({
            goalId: payload.goalId!,
            taskId: payload.taskId,
            isCompleteBy: payload.isCompleteBy,
        })
    )
}

function* getTickHandlerAll({ payload }: SagaResponse<TickHandler>): any {
    yield put(Actions.setTickHandlerAll(payload))
}

function* getGoals({ payload }: SagaResponse): any {
    if (payload?.isConnected) {
        try {
            let result = yield call(
                apiCall,
                'GET',
                serviceUrl.goals,
                payload.query,
                payload.token
            ) //Get request

            yield put(
                Actions.getGoals({
                    goals: result,
                })
            )
        } catch (error) {
            // if (payload.isLoading) payload.isLoading(false)
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    yield put(Actions.setLoadingCardGoal())
    if (payload.isLoading) payload.isLoading(false)
}

function* getGroupGoals({ payload }: SagaResponse): any {
    if (payload?.isConnected) {
        try {
            let result = yield call(
                apiCall,
                'GET',
                serviceUrl.groupGoals,
                payload.query,
                payload.token
            ) //Get request
            yield put(Actions.getGroupGoals(result))
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }
    if (payload.isLoading) payload.isLoading(false)
}

function* getCheckedGoal({
    payload,
}: SagaResponse<MergeReponseCheckedHandler>): any {
    if (payload?.isConnected) {
        try {
            if (payload.goalId && payload.taskId) {
                let result = yield call(
                    apiCall,
                    'PUT',
                    serviceUrl.goal('check', payload.goalId, payload.taskId),
                    undefined,
                    payload.token
                ) //Get request
                yield put(Actions.onCheckHandler(result))
            }
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
        yield put(
            Actions.initializeOfflineModeGeneral({
                endpoint: serviceUrl.goal(
                    'check',
                    payload.goalId,
                    payload.taskId
                ),
                method: 'PUT',
                body: undefined,
                token: payload.token,
            })
        )

        // handling local checked
        yield put(Actions.setCheckHandlerLocal(payload.taskId, payload.user!))
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* getUncheckedGoal({
    payload,
}: SagaResponse<MergeReponseCheckedHandler>): any {
    if (payload?.isConnected) {
        try {
            if (payload.goalId && payload.taskId) {
                let result = yield call(
                    apiCall,
                    'PUT',
                    serviceUrl.goal('uncheck', payload.goalId, payload.taskId),
                    undefined,
                    payload.token
                ) //Get request
                yield put(Actions.onUncheckHandler(result))
            }
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
        yield put(
            Actions.initializeOfflineModeGeneral({
                endpoint: serviceUrl.goal(
                    'uncheck',
                    payload.goalId,
                    payload.taskId
                ),
                method: 'PUT',
                body: undefined,
                token: payload.token,
            })
        )

        // handling local check
        yield put(Actions.setUncheckHandlerLocal(payload.taskId))
        // yield put(Actions.onUncheckHandler(result))
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onSubmitGoal({ payload }: SagaResponse<SubmitGoalDetailAPI>): any {
    if (payload?.isConnected) {
        try {
            let result: CreateGoalRequest = yield call(
                apiCall,
                'POST',
                serviceUrl.singleGoal,
                goalDataSendingTransform(payload.goal),
                payload.token
            ) //Get request
            yield put(
                Actions.findGoal({
                    token: payload.token,
                    goalId: result.id,
                    isConnected: payload?.isConnected,
                })
            )
            // if (payload.setGoalIDTemp) payload.setGoalIDTemp(result.id)
            if (payload.isDone) payload.isDone(false, result.id)
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
        const localData: Goals = createGoalLocal(payload.goal, payload?.user!)
        if (payload.isDone) payload.isDone(false, localData.id)
        yield put(Actions.initializeGoalLocal(localData))
        yield put(
            Actions.initializeOfflineModeGoal({
                endpoint: serviceUrl.singleGoal,
                method: 'POST',
                body: goalDataSendingTransform(payload.goal),
                token: payload.token,
            })
        )
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onFindGoal({ payload }: SagaResponse<SubmitGoalDetailAPI>): any {
    if (payload?.isConnected) {
        try {
            let result = yield call(
                apiCall,
                'GET',
                `${serviceUrl.singleGoal}/${payload.goalId}`,
                undefined,
                payload.token
            ) //Get request

            yield put(Actions.initializeFindGoal(result))
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onUpdateFindGoal({
    payload,
}: SagaResponse<SubmitGoalDetailAPI>): any {
    if (payload?.isConnected) {
        try {
            let result = yield call(
                apiCall,
                'GET',
                `${serviceUrl.singleGoal}/${payload.goalId}`,
                undefined,
                payload.token
            ) //Get request

            if (payload.mutableGoal)
                yield put(Actions.initializeMutableUpdateGoal(result))
            else yield put(Actions.initializeUpdateFindGoal(result))
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onUpdateGoal({ payload }: SagaResponse<SubmitGoalDetailAPI>): any {
    if (payload?.isConnected) {
        try {
            yield call(
                apiCall,
                'PUT',
                `${serviceUrl.singleGoal}/${payload.goalId}`,
                goalDataSendingTransform(payload.goal),
                payload.token
            )

            yield put(
                Actions.findUpdateGoal({
                    token: payload.token,
                    goalId: payload.goalId!,
                    isConnected: payload?.isConnected,
                })
            )
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode

        yield put(
            Actions.initializeUpdateFindGoal(
                updateGoalLocal(payload.existingGoal!, payload.goal)
            )
        )

        yield put(
            Actions.initializeOfflineModeGeneral({
                endpoint: `${serviceUrl.singleGoal}/${payload.goalId}`,
                method: 'PUT',
                body: goalDataSendingTransform(payload.goal),
                token: payload.token,
            })
        )
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onDeleteGoal({ payload }: SagaResponse<SubmitGoalDetailAPI>): any {
    if (payload?.isConnected) {
        try {
            yield call(
                apiCall,
                'DELETE',
                `${serviceUrl.singleGoal}/${payload.goalId}`,
                goalDataSendingTransform(payload.goal),
                payload.token
            )

            yield put(
                Actions.deleteGoal({
                    goalId: payload.goalId!,
                })
            )

            if (isFunction(payload.isDone)) payload.isDone(true)
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
        yield put(
            Actions.deleteGoal({
                goalId: payload.goalId!,
            })
        )

        yield put(
            Actions.initializeOfflineModeGeneral({
                endpoint: `${serviceUrl.singleGoal}/${payload.goalId}`,
                method: 'DELETE',
                body: goalDataSendingTransform(payload.goal),
                token: payload.token,
            })
        )

        if (isFunction(payload.isDone)) payload.isDone(true)
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* getAddingTask({ payload }: SagaResponse<AddingTaskAPI>) {
    if (payload?.isConnected) {
        try {
            let result: Spread<[Task, { goal: Goals }]> = yield call(
                apiCall,
                'POST',
                `${serviceUrl.singleGoal}/${payload.goalId}/task`,
                taskDataSendingTransform(payload.task),
                payload.token
            )

            yield put(
                Actions.getResponseAddingTask({
                    goalId: result.goal.id,
                    newTask: omit(result, 'goal'),
                })
            )
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
        const localDataTask: Task = createTaskLocal(payload.task)
        yield put(
            Actions.getResponseAddingTask({
                goalId: payload.goalId,
                newTask: localDataTask,
            })
        )
        yield put(
            Actions.initializeOfflineModeTask({
                endpoint: serviceUrl.tasks(localDataTask.id!),
                method: 'POST',
                body: payload.task,
                token: payload.token,
            })
        )
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* getPrivateGoal({ payload }: SagaResponse<SubmitGoalDetailAPI>): any {
    if (payload?.isConnected) {
        try {
            yield call(
                apiCall,
                'PUT',
                `${serviceUrl.singleGoal}/${payload.goalId}/private`,
                undefined,
                payload.token
            )

            yield put(Actions.getPrivateGoal(payload.goalId!))
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* getPublicGoal({ payload }: SagaResponse<SubmitGoalDetailAPI>): any {
    if (payload?.isConnected) {
        try {
            let result = yield call(
                apiCall,
                'PUT',
                `${serviceUrl.singleGoal}/${payload.goalId}/public`,
                undefined,
                payload.token
            )

            yield put(Actions.getPublicGoal(payload.goalId!))
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onSyncOfflineMode({ payload }: SagaResponse<OfflineModeState>): any {
    try {
        let result = yield call(
            apiCall,
            payload.method,
            payload.endpoint,
            payload.body,
            payload.token
        )

        yield put(Actions.initializeCleanOfflineRequest(payload.id))
        yield put(Actions.initializeSyncOfflineMode(result))
    } catch (error) {
        //   console.log(error)
    }
}

function* onDeleteGoalGroup({ payload }: SagaResponse<GoalGroupAPI>): any {
    if (payload?.isConnected) {
        try {
            yield call(
                apiCall,
                'POST',
                serviceUrl.deleteGoal,
                payload.body,
                payload.token
            )

            yield put(
                Actions.initializeDeleteGoalGroup({
                    goalList: payload.body?.goalIds,
                    tabType: payload.tabType!,
                })
            )
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
        yield put(
            Actions.initializeDeleteGoalGroup({
                goalList: payload.body?.goalIds,
                tabType: payload.tabType!,
            })
        )

        yield put(
            Actions.initializeOfflineModeGeneral({
                endpoint: serviceUrl.deleteGoal,
                method: 'POST',
                body: payload.body,
                token: payload.token,
            })
        )
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onDeleteAllGoal({ payload }: SagaResponse<GoalGroupAPI>): any {
    if (payload?.isConnected) {
        try {
            yield call(
                apiCall,
                'POST',
                serviceUrl.deleteAllGoal,
                payload.body,
                payload.token
            )

            yield put(
                Actions.initializeDeleteAllGoalGroup({
                    tabType: payload.tabType!,
                })
            )
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
        yield put(
            Actions.initializeDeleteAllGoalGroup({
                tabType: payload.tabType!,
            })
        )

        yield put(
            Actions.initializeOfflineModeGeneral({
                endpoint: serviceUrl.deleteAllGoal,
                method: 'POST',
                body: payload.body,
                token: payload.token,
            })
        )
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onContinueDeleteTask({
    payload,
}: SagaResponse<DeleteSingleTask>): any {
    if (payload?.isConnected) {
        try {
            yield call(
                apiCall,
                'POST',
                serviceUrl.deleteTask,
                payload.body,
                payload.token
            )

            yield put(
                Actions.initializeDeleteSingleTask({
                    taskGroupId: payload.body?.taskIds!,
                })
            )
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
        yield put(
            Actions.initializeDeleteSingleTask({
                taskGroupId: payload.body?.taskIds!,
            })
        )
        yield put(
            Actions.initializeOfflineModeGeneral({
                endpoint: serviceUrl.deleteTask,
                method: 'POST',
                body: payload.body,
                token: payload.token,
            })
        )
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onContinueDeleteAllTask({ payload }: SagaResponse): any {
    if (payload?.isConnected) {
        try {
            yield call(
                apiCall,
                'POST',
                serviceUrl.deleteAllTask,
                undefined,
                payload.token
            )

            yield put(Actions.getDeleteAllTask())
            yield put(Actions.onDeleteAllTaskInGoal())
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
        yield put(Actions.getDeleteAllTask())
        yield put(Actions.onDeleteAllTaskInGoal())
        yield put(
            Actions.initializeOfflineModeGeneral({
                endpoint: serviceUrl.deleteAllTask,
                method: 'POST',
                body: undefined,
                token: payload.token,
            })
        )
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onPinGoals({ payload }: SagaResponse<PinGoalType>): any {
    if (payload?.isConnected) {
        try {
            if (payload.isPinned) {
                // pinned goal
                yield call(
                    apiCall,
                    'PUT',
                    serviceUrl.unpinGoal(payload.goalId),
                    undefined,
                    payload.token
                )

                yield put(Actions.setSyncUnpinnedGoal())
                yield put(Actions.initializeUnpinnedGoalDetail())
            } else {
                // unpinned goal
                yield call(
                    apiCall,
                    'PUT',
                    serviceUrl.pinGoal(payload.goalId),
                    undefined,
                    payload.token
                )

                yield put(Actions.setSyncPinnedGoal())
                yield put(Actions.initializePinnedGoalDetail())
            }
            if (payload.isDone) payload.isDone(false)
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onFetchSingleTask({ payload }: SagaResponse<FetchTaskAPI>): any {
    if (payload?.isConnected) {
        try {
            // pinned goal
            let result: Task = yield call(
                apiCall,
                'GET',
                serviceUrl.singleTask(payload.goaldId, payload.taskId),
                undefined,
                payload.token
            )

            yield put(Actions.setFetchTask(result))
            // yield put(Actions.onGetAnotherUserGoal(result))
            if (payload.isDone) payload.isDone(false)
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onSetAnotherGoal({ payload }: SagaResponse<AnotherUserGoalAPI>): any {
    if (payload?.isConnected) {
        try {
            // pinned goal
            let result: Goals[] = yield call(
                apiCall,
                'GET',
                serviceUrl.anotherUserGoal(payload.userId),
                undefined,
                payload.token
            )

            // yield put(Actions.setFetchTask(result))
            yield put(Actions.onGetAnotherUserGoal(result))
            if (payload.isDone) payload.isDone(false)
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onSetUpdateTask({ payload }: SagaResponse<UpdateTaskAPI>): any {
    if (payload?.isConnected) {
        const data = payload.updatedData
        const body: TaskCreateGoalRequest = {
            ...data,
            dueDate: transformUpdateTaskDateTime(data.dueDate, true),
        }

        try {
            // request the updateTask
            yield call(
                apiCall,
                'PUT',
                serviceUrl.task(payload.goalId, payload.taskId),
                body,
                payload.token
            )

            // fetching the updated data
            yield put(
                Actions.onFetchingUpdateTaskAPI({
                    goalId: payload.goalId,
                    taskId: payload.taskId,
                    token: payload.token,
                    isConnected: payload.isConnected,
                })
            )

            if (payload.isDone) payload.isDone(false)
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onFetchingUpdateTask({
    payload,
}: SagaResponse<Omit<UpdateTaskAPI, 'updatedData'>>): any {
    if (payload?.isConnected) {
        try {
            // pinned goal
            let result: Task = yield call(
                apiCall,
                'GET',
                serviceUrl.task(payload.goalId, payload.taskId),
                undefined,
                payload.token
            )

            yield put(Actions.onGetUpdateTaskAPI(result))
            yield put(
                Actions.onSetUpdateTaskInGoal({
                    goalId: payload.goalId,
                    task: result,
                })
            )
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }
}

function* onSetDeleteTaskInGoal({
    payload,
}: SagaResponse<Omit<UpdateTaskAPI, 'updatedData'>>): any {
    if (payload?.isConnected) {
        try {
            // pinned goal
            yield call(
                apiCall,
                'DELETE',
                serviceUrl.singleTask(payload.goalId, payload.taskId),
                undefined,
                payload.token
            )

            // yield put(Actions.onGetUpdateTaskAPI(result))
            yield put(
                Actions.initializeDeleteSingleTask({
                    taskGroupId: [payload.taskId],
                })
            )

            yield put(
                Actions.onSetDeleteSingleTaskInGoal({
                    goalId: payload.goalId,
                    taskId: payload.taskId,
                })
            )
            if (payload.isDone) payload.isDone(false)
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onSetGoalMember({
    payload,
}: SagaResponse<PayloadResponse<MemberGoalType>>): any {
    if (payload?.isConnected) {
        try {
            // pinned goal
            yield call(
                apiCall,
                'POST',
                serviceUrl.invitationGoalMember(payload.query?.goalId!),
                { userId: payload.query?.userId },
                payload.token
            )

            // yield put(Actions.onGetUpdateTaskAPI(result))
            yield put(
                Actions.findUpdateGoal({
                    goalId: payload.query?.goalId!,
                    token: payload.token,
                    isConnected: payload.isConnected,
                    isDone: payload.isDone,
                    isLoading: payload.isLoading,
                    mutableGoal: true,
                })
            )

            if (payload.isDone) payload.isDone(false)
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onRemoveGoalMember({
    payload,
}: SagaResponse<PayloadResponse<MemberGoalType>>): any {
    if (payload?.isConnected) {
        try {
            // pinned goal
            yield call(
                apiCall,
                'DELETE',
                serviceUrl.removingMemberGoal(
                    payload.query?.goalId!,
                    payload.query?.userId!
                ),
                undefined,
                payload.token
            )

            // yield put(Actions.onGetUpdateTaskAPI(result))
            yield put(
                Actions.findUpdateGoal({
                    goalId: payload.query?.goalId!,
                    token: payload.token,
                    isConnected: payload.isConnected,
                    isDone: payload.isDone,
                    isLoading: payload.isLoading,
                    mutableGoal: true,
                })
            )

            if (payload.isDone) payload.isDone(false)
        } catch (error) {
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

function* onSetCountPromotionCTA({ payload }: SagaResponse): any {
    if (payload?.isConnected) {
        try {
            yield call(
                apiCall,
                'POST',
                serviceUrl.goalsPromotionsCTA,
                payload.query,
                payload.token
            ) //Get request
        } catch (error) {
            // if (payload.isLoading) payload.isLoading(false)
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isDone) payload.isDone(false)
}

function* onSetRecommendationGoal({ payload }: SagaResponse): any {
    if (payload?.isConnected) {
        try {
            let result: PaginationGoalResult = yield call(
                apiCall,
                'GET',
                serviceUrl.goalsRecommendation,
                payload.query,
                payload.token
            ) //Get request

            yield put(Actions.initializeRecommendationGoals(result))
        } catch (error) {
            // if (payload.isLoading) payload.isLoading(false)
            //   console.log(error)
        }
    } else {
        // handling offline mode
    }

    if (payload.isLoading) payload.isLoading(false)
}

export default function* goalSaga() {
    yield takeLatest(Types.Goal.GET_USER_GROUP_GOAL, getGroupGoals)
    yield takeLatest(Types.Goal.GET_USER_GOAL, getGoals)
    yield takeLeading(Types.Goal.ON_CHECK_HANDLER, getCheckedGoal)
    yield takeLeading(Types.Goal.ON_UNCHECK_HANDLER, getUncheckedGoal)
    yield takeLeading(Types.Goal.ON_UPDATE_GOAL_HANDLER, onUpdateGoal)
    yield takeLeading(Types.Goal.ON_CREATE_GOAL_HANDLER, onSubmitGoal)
    yield takeLeading(Types.Goal.ON_FIND_GOAL, onFindGoal)
    yield takeLeading(Types.Goal.GET_UPDATED_GOAL, onUpdateFindGoal)
    yield takeLeading(Types.Goal.ON_DELETE_GOAL, onDeleteGoal)
    yield takeLeading(Types.Task.SET_ADDING_TASK, getAddingTask)
    yield takeLeading(Types.Goal.SET_PRIVATE_GOAL, getPrivateGoal)
    yield takeLeading(Types.Goal.SET_PUBLIC_GOAL, getPublicGoal)
    yield takeLeading(Types.OFFLINE_MODE.SYNC_OFFLINE_MODE, onSyncOfflineMode)
    yield takeLeading(Types.Goal.ON_DELETED_GOAL_GROUP, onDeleteGoalGroup)
    yield takeLeading(Types.Goal.ON_DELETED_ALL_GOAL_GROUP, onDeleteAllGoal)
    yield takeLeading(Types.Goal.ON_SET_PIN_GOAL, onPinGoals)
    yield takeLeading(
        Types.Goal.SET_RECOMMENDATION_GOAL,
        onSetRecommendationGoal
    )
    yield takeLeading(Types.Goal.FETCHING_ANOTHER_USER_GOAL, onSetAnotherGoal)
    yield takeLeading(Types.Goal.FETCHING_ANOTHER_USER_GOAL, onSetAnotherGoal)
    yield takeLeading(Types.Goal.SET_ADDING_MEMBER_IN_GOAL, onSetGoalMember)
    yield takeLeading(
        Types.Goal.SET_REMOVING_MEMBER_IN_GOAL,
        onRemoveGoalMember
    )
    yield takeLeading(
        Types.Goal.SET_COUNT_PROMOTION_CTA,
        onSetCountPromotionCTA
    )

    yield takeEvery(Types.Task.GET_TICK_HANDLER, getTickHandler)
    yield takeEvery(Types.Task.GET_TICK_HANDLER_ALL, getTickHandlerAll)
    yield takeLeading(Types.Task.SET_DELETE_SINGLE_TASK, onContinueDeleteTask)
    yield takeLeading(Types.Task.SET_DELETE_ALL_TASK, onContinueDeleteAllTask)
    yield takeLeading(Types.Task.FETCH_SINGLE_TASK, onFetchSingleTask)
    yield takeLeading(Types.Task.SET_UPDATE_TASK, onSetUpdateTask)
    yield takeLeading(Types.Task.FETCH_UPDATE_TASK, onFetchingUpdateTask)
    yield takeLeading(Types.Task.SET_DELETE_TASK_IN_GOAL, onSetDeleteTaskInGoal)
}
