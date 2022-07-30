/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import { delay, isEmpty } from 'lodash'
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { BackHandler } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

// @components
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import GoalsPageMenu from 'components/goals-page-menu/GoalPageMenu'
import LoadingFull from 'components/loading/LoadingFull'
import ListAllGoal from 'src/components/molecules/listAllGoal'
import PopupGroup from 'src/components/templates/goal/goalPopupGroup'

// @utils
import { NavProps } from 'src/utils/const'
import { Goals } from 'src/entity/Goals.entity'
import { BuatGoalBaruPageParams } from 'src/pages/inside-pages/buat-goal-baru/params'
import { GoalPageParams } from 'src/pages/inside-pages/goal/params'
import { AbsoluteMenuContainer } from 'src/pages/inside-pages/task/styled'

// @saga
import {
    deleteGoalGroup,
    initializeGoal,
    initializeGroupGoals,
    initializeOnFilterProcessGoal,
    onDeleteAllGroup,
    setDetailGoal,
} from 'src/store/actions'
import StoreData from 'store/types'

// @hook
import useAuthorization from 'src/hook/useAuthorization'
import {
    BackActionType,
    GoalsTabType,
    GoToGoalType,
    OnChangeCheckGoalType,
} from 'src/utils/types'

// @context
import MyGoalContext from 'src/context/myGoalContext'
import GoalsPageContext from 'src/context/GoalsPageContext'
import useConnected from 'src/hook/useConnected'

interface GoalsPageProps extends NavProps {}

export default function GoalsPage(props: GoalsPageProps) {
    const dispatch = useDispatch()
    const { connected } = useConnected()

    const filteredGoals = useSelector(
        ({ myGoals }: StoreData) => myGoals.filteredGoal
    )
    const goals = useSelector(({ myGoals }: StoreData) => myGoals.goals)
    const tabType = useSelector(({ myGoals }: StoreData) => myGoals.typeGoal)

    const { auth } = useContext(GoalsPageContext)

    // @state
    const [filteredGoalLocal, setFilteredGoalLocal] = useState<Goals[]>([])
    const [typingTimeout, setTypingTimeout] = useState({
        is_typing: false,
        timeout: null,
    })
    const [continueDelete, setContinueDelete] = useState(false)
    const [active_tab, setActiveTab] = useState<GoalsTabType>('proses')
    const [query, setQuery] = useState<string>('')
    const [show_menu, setShowMenu] = useState<boolean>(false)
    const [show_check, setShowCheck] = useState<boolean>(false)
    const [checked_ids, setCheckedIDs] = useState<string[]>([])
    const [show_popup_delete, setShowPopupDelete] = useState<boolean>(false)
    const [show_popup_delete_semua, setShowPopupDeleteSemua] =
        useState<boolean>(false)
    const [show_popup_delete_success, setShowPopupDeleteSuccess] =
        useState<boolean>(false)
    const [show_popup_delete_semua_success, setShowPopupDeleteSemuaSuccess] =
        useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loading_delete, setLoadingDelete] = useState<boolean>(false)

    const enabled_action_menu = useMemo(
        () => filteredGoalLocal?.length > 0,
        [filteredGoalLocal?.length]
    )

    // @method
    const onChangeCheckGoal = useCallback<OnChangeCheckGoalType>(
        (goal: Goals, check: boolean) => {
            if (check) {
                if (checked_ids.includes(goal.id)) {
                    return
                }
                setCheckedIDs([...checked_ids, goal.id])
            } else {
                setCheckedIDs(
                    checked_ids.filter((goal_id: string) => goal_id !== goal.id)
                )
            }
        },
        [checked_ids, setCheckedIDs]
    )

    const onLongPress = useCallback<GoToGoalType>(
        (goal: Goals) => {
            setShowCheck(true)
            setCheckedIDs([goal.id])
        },
        [setShowCheck, setCheckedIDs]
    )

    const onPilihSemua = useCallback(() => {
        if (filteredGoalLocal.length === checked_ids.length) {
            setCheckedIDs([])
            return
        }
        setCheckedIDs(filteredGoalLocal.map((x) => x.id))
    }, [setCheckedIDs, filteredGoalLocal, checked_ids.length])

    const deleteGoals = useCallback(() => {
        setContinueDelete(true)
        setShowPopupDelete(false)
    }, [setContinueDelete, setShowPopupDeleteSemua])

    const continueDeleteGoals = useCallback(() => {
        setLoadingDelete(true)
        const onDone = (status: boolean) => {
            setShowPopupDeleteSuccess(true)
            delay(() => {
                setShowPopupDeleteSuccess(status)
                setContinueDelete(status)
                setShowCheck(status)
                setLoadingDelete(status)
            }, 100)
        }

        dispatch(
            deleteGoalGroup({
                body: {
                    goalIds: checked_ids,
                },
                isConnected: connected,
                isLoading: onDone,
                token: auth,
                tabType,
            })
        )
    }, [
        setLoadingDelete,
        connected,
        tabType,
        checked_ids,
        setShowPopupDelete,
        setShowCheck,
        auth,
    ])

    const continueDeleteAllGoal = useCallback(() => {
        setLoadingDelete(true)
        const onDone = (status: boolean) => {
            setShowPopupDeleteSuccess(true)
            delay(() => {
                setShowPopupDeleteSuccess(status)
                setContinueDelete(status)
                setShowCheck(status)
                setLoadingDelete(status)
            }, 800)
        }
        dispatch(
            onDeleteAllGroup({
                token: auth,
                isConnected: connected,
                tabType,
                isLoading: onDone,
            })
        )
    }, [
        setLoadingDelete,
        setShowPopupDelete,
        setShowCheck,
        connected,
        setShowPopupDeleteSuccess,
        tabType,
        onDeleteAllGroup,
        auth,
        setContinueDelete,
    ])

    const getGoals = useCallback(
        async (query: string) => {
            if (isEmpty(filteredGoals)) {
                setLoading(true)
                if (tabType == 'saya')
                    dispatch(
                        initializeGoal({
                            token: auth,
                            isLoading: setLoading,
                            isConnected: connected,
                            query,
                        })
                    )

                if (tabType == 'grup')
                    dispatch(
                        initializeGroupGoals({
                            token: auth,
                            isLoading: setLoading,
                            isConnected: connected,
                            query,
                        })
                    )
            }
        },
        [filteredGoals, setLoading, connected, tabType]
    )

    const searchGoalLocal = useCallback(
        (query: string) => {
            if (!query) setFilteredGoalLocal(filteredGoals)
            else {
                const newLocalGoal = filteredGoals.filter(
                    (goal) => goal.name.indexOf(query) > -1
                )
                setFilteredGoalLocal(newLocalGoal)
            }
            setLoading(false)
        },
        [filteredGoalLocal, filteredGoals, setLoading]
    )

    const onQueryChange = useCallback(
        (q: string) => {
            setLoading(true)
            if (typingTimeout.is_typing)
                clearTimeout(typingTimeout.timeout as any)
            setTypingTimeout({
                is_typing: true,
                timeout: setTimeout(() => {
                    typingTimeout.is_typing = false
                    // getGoals(q)
                    searchGoalLocal(q)
                }, 300) as any,
            })
        },
        [typingTimeout, clearTimeout, getGoals, setTypingTimeout]
    )

    const deleteAllGoal = useCallback(() => {
        setContinueDelete(true)
        setShowPopupDeleteSemua(false)
    }, [continueDelete, setShowPopupDeleteSemua])

    const gotoGoal = useCallback<GoToGoalType>(
        (goal: Goals) => {
            const params: GoalPageParams = {
                id: goal.id,
            }
            dispatch(setDetailGoal({ goalId: goal.id }))
            props.navigation.navigate('Goal', params)
        },
        [props.navigation.navigate]
    )

    const handleBackButton = () => {
        props.navigation.goBack();
        return true;
      }

    BackHandler.addEventListener('hardwareBackPress', handleBackButton)

    const backAction = useCallback<BackActionType>(() => {
        if (show_check) {
            setShowCheck(false)
            setCheckedIDs([])
            return true
        }
        if (props.navigation.canGoBack()) props.navigation.goBack()
        return true
    }, [show_check, setShowCheck, setCheckedIDs, props.navigation])

    useEffect(() => {
        if (!show_check)
            BackHandler.removeEventListener('hardwareBackPress', backAction)
        else BackHandler.addEventListener('hardwareBackPress', backAction)
    }, [show_check])

    useEffect(() => {
        dispatch(
            initializeOnFilterProcessGoal({
                activeTab: active_tab,
                type: tabType,
            })
        )
    }, [active_tab, tabType, goals])

    useEffect(() => {
        onQueryChange(query)
    }, [query, filteredGoals])

    return (
        <GoalsPageContext.Provider
            value={{
                auth: useAuthorization(props.navigation),
                continueToDelete: continueDelete,
                params: props.route.params,
                typingTimeout: typingTimeout,
            }}
        >
            <DocheckSafeAreaView>
                <AbsoluteMenuContainer
                    style={{ left: show_menu ? 0 : '100%' }}
                    onTouchEnd={() => {
                        setShowMenu(false)
                    }}
                >
                    <GoalsPageMenu
                        enableMenu={enabled_action_menu}
                        onPilih={() => setShowCheck(true)}
                        onHapusSemua={() => setShowPopupDeleteSemua(true)}
                        onGoalsBaru={() =>
                            props.navigation.navigate('BuatGoalBaru', {
                                mode: 'new',
                            } as BuatGoalBaruPageParams)
                        }
                    />
                </AbsoluteMenuContainer>
                <MyGoalContext.Provider
                    value={{ goalsTab: active_tab, setGoalsTab: setActiveTab }}
                >
                    <ListAllGoal
                        backAction={backAction}
                        checkedIds={checked_ids}
                        listGoal={filteredGoalLocal}
                        navigation={props.navigation}
                        onPilihSemua={onPilihSemua}
                        query={query}
                        setQuery={setQuery}
                        setShowMenu={setShowMenu}
                        showCheck={show_check}
                        setShowPopupDelete={setShowPopupDelete}
                        gotoGoal={gotoGoal}
                        loading={loading}
                        onChangeCheckGoal={onChangeCheckGoal}
                        onLongPress={onLongPress}
                    />
                </MyGoalContext.Provider>
                <LoadingFull loading={loading_delete} />
                <PopupGroup
                    goalsDeleteAction={{
                        isPopupDelete: show_popup_delete,
                        setShowPopupDelete: setShowPopupDelete,
                        continueToDelete: continueDelete,
                        setLoadDelete: setLoadingDelete,
                        continueDeleteGoal: continueDeleteGoals,
                        deleteGoal: deleteGoals,
                        cancelable: true,
                    }}
                    goalsDeleteAllAction={{
                        cancelable: true,
                        continueDeleteAllGoal,
                        deleteAllGoals: deleteAllGoal,
                        isDeleteAll: show_popup_delete_semua,
                        setShowDeleteAll: setShowPopupDeleteSemua,
                    }}
                    goalsDeleteSuccessAction={{
                        isPopupDeleteSuccess: show_popup_delete_success,
                        onHide: () => {
                            if (continueDelete) {
                                setLoadingDelete(true)
                                continueDeleteAllGoal()
                            }
                        },
                        popupDeleteHandler: setShowPopupDeleteSemua,
                        setShowPopupDeleteSuccess,
                    }}
                    goalDeleteAllSuccessAction={{
                        setShow: setShowPopupDeleteSemuaSuccess,
                        isDeleteAllSuccess: show_popup_delete_semua_success,
                        onCancel: () => {
                            setShowPopupDeleteSemuaSuccess(false)
                            props.navigation.goBack()
                        },
                    }}
                />
            </DocheckSafeAreaView>
        </GoalsPageContext.Provider>
    )
}
