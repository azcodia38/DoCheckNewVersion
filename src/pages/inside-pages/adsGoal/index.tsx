/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useMemo, useState } from 'react'
import { isEqual, uniqueId } from 'lodash'
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { useDispatch } from 'react-redux'

// @entity
import { Goals } from 'src/entity/Goals.entity'

// @helpers
import { NavProps } from 'src/utils/const'
import { CopyGoalAdsGoalContainer, GoalPageContainer } from './styled'
import { isIOS } from 'src/utils'
import { DebugAlert } from 'src/utils/alert'

// @redux
import { GoalsActionType } from 'store/data/goals'

// @types
import {
    GoalPageParams,
    PredefinedGoalPageParams,
} from 'src/pages/inside-pages/goal/params'
import { ROUTE_PAGE } from 'src/utils/types/componentsTypes'

// @api
import { copyTemplateToGoalAPI, myGoalDetailAPI } from 'src/api/my-goal'

// @components
import PopUpFailed from 'components/popup/failed/PopUpFailed'
import DescriptionGoals from 'src/components/atoms/descriptionGoals'

import Header from 'components/header/Header'
import {
    AlternativeCopyIcon,
    ImageBelumAdaTask,
    ImageBerhasilDiubah,
} from 'components/icons/Icons'
import ItemTask from 'components/item-task/ItemTask'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import LoadingFull from 'components/loading/LoadingFull'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import TouchHeadTask from 'src/components/atoms/touchHeadTask'

// @hook
import useUtils from 'src/hook/useUtils'
import useAuthorization from 'src/hook/useAuthorization'
import { setCopyGoal } from 'src/store/actions'
import useConnected from 'src/hook/useConnected'
import Pills from 'src/components/atoms/pills'
import { TaskListLoading } from 'components/loader-collections'
import NotLoadingButEmpty from 'src/components/atoms/descriptionGoal/notLoadingButEmpty'
import AdsButton from 'src/components/atoms/button/adsButton'
import DropShadow from 'react-native-drop-shadow'
import useAnimation from 'src/hook/useAnimation'
import useDimension from 'src/hook/useDimension'
import { hasNotch } from 'react-native-device-info'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useDescriptionHeight from 'src/hook/useDescriptionHeight'

const { TouchHeadHeight, newPaddingSize, swipeableHideYPosition } = useUtils()

interface AdsGoalPageProps extends NavProps {}

export default function AdsGoalPage(props: AdsGoalPageProps) {
    const dispatch = useDispatch()
    const params: PredefinedGoalPageParams = props.route.params
    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()

    // @state
    const [isCopySuccess, setShowPopupCopySuccess] = useState<boolean>(false)
    const [show_popup_failed, setShowFailed] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [copiedGoal, setCopiedGoal] = useState<Goals>()

    const goalName = useMemo(() => params.goal.name ?? '', [params.goal.name])
    const isOpenModal = useMemo(() => TouchHeadHeight + 280, [TouchHeadHeight])

    const { descriptionHeight } = useDescriptionHeight(isOpenModal)

    const onOKhandler = useCallback(() => {
        setShowFailed(false)
    }, [setShowFailed])

    const finalizePopup = useCallback(() => {
        if (copiedGoal?.id) {
            setShowPopupCopySuccess(false)
            props.navigation.goBack()
            const params: GoalPageParams = {
                id: copiedGoal?.id,
            }
            props.navigation.navigate(ROUTE_PAGE.GOAL, params)
        }
    }, [
        copiedGoal?.id,
        setShowPopupCopySuccess,
        props.navigation.goBack,
        props.navigation.navigate,
        setShowPopupCopySuccess,
    ])

    const copyGoal = useCallback(async () => {
        setLoading(true)
        try {
            const fetchingGoals = await copyTemplateToGoalAPI(
                auth,
                params.goal.id,
                {
                    connected,
                    async actionSave(_: Goals) {
                        const data: Goals = await myGoalDetailAPI(auth, _.id)
                        dispatch({
                            type: GoalsActionType.ADD_MY_GOALS,
                            data,
                        })
                    },
                    fallback() {
                        throw new Error(`Anda sedang offline`)
                    },
                }
            )
            setCopiedGoal(fetchingGoals)
            setShowPopupCopySuccess(true)
            dispatch(setCopyGoal(fetchingGoals))
            setTimeout(() => setShowPopupCopySuccess(false), 1000)
        } catch (err: any) {
            setShowFailed(true)
        } finally {
            setLoading(false)
        }
    }, [
        setLoading,
        copyTemplateToGoalAPI,
        auth,
        params.goal.id,
        connected,
        myGoalDetailAPI,
        setShowPopupCopySuccess,
        setCopiedGoal,
        GoalsActionType.ADD_MY_GOALS,
        DebugAlert,
        setTimeout,
        setCopyGoal,
    ])

    const { buttonScale, onPressIn, onPressOut } = useAnimation()
    const { height } = useDimension()
    const bottomInset = useSafeAreaInsets()

    const animatedScaleStyle = useMemo(
        () => ({
            transform: [{ scale: buttonScale }],
        }),
        [buttonScale]
    )
    // const contentHeight = useMemo(
    //     () => height - TouchHeadHeight,
    //     [height, TouchHeadHeight]
    // )
    const optionalProps = useMemo(
        () => ({
            [isIOS ? 'modalHeight' : '']: hasNotch() ? height / 1.2 : height,
        }),
        [isIOS, hasNotch, height]
    )

    return (
        <DocheckSafeAreaView
            barStyle={hasNotch() ? 'light-content' : 'dark-content'}
            fullStatusBar
            statusBackgroundColor={'#262D33'}
        >
            <GoalPageContainer style={styles.goalPageContainer}>
                <WithPadding
                    style={{
                        ...styles.withPadding,
                        display: 'flex',
                        height: descriptionHeight,
                        width: '100%',
                        flexDirection: 'column',
                    }}
                >
                    <View>
                        <Space value={7} />
                        <Header
                            navigation={props.navigation}
                            withBack
                            grayArrow
                            title="Goals"
                            fontContent="light"
                        />
                        <ScrollView
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            style={{
                                ...styles.scrollView,
                            }}
                        >
                            <Space value={7} />
                            <Pills title="highlight" />
                            <Text>
                                <Tipografi
                                    type={'title'}
                                    style={{ color: '#fff' }}
                                >
                                    {goalName}
                                </Tipografi>
                            </Text>
                            <Space value={18} />
                            <Tipografi
                                type={'normal'}
                                style={{ lineHeight: 23 }}
                            >
                                <DescriptionGoals
                                    description={params.goal.description}
                                    adsGoal
                                />
                            </Tipografi>
                            <Space value={250} />
                        </ScrollView>
                    </View>
                </WithPadding>
                <Modalize
                    HeaderComponent={<TouchHeadTask />}
                    alwaysOpen={isOpenModal}
                    disableScrollIfPossible={true}
                    useNativeDriver={true}
                    handlePosition={'outside'}
                    panGestureComponentEnabled={true}
                    closeOnOverlayTap={true}
                    flatListProps={{
                        data: params.goal.tasks ?? [],
                        keyExtractor: (t) => t.id ?? uniqueId(),
                        renderItem: ({ item, index }) => (
                            <View key={index}>
                                <ItemTask
                                    item={{
                                        ...item,
                                        completeBy: undefined,
                                    }}
                                    pinned={false}
                                />
                            </View>
                        ),

                        ListEmptyComponent: () => (
                            <>
                                {loading && <TaskListLoading />}
                                <NotLoadingButEmpty tasks={params.goal.tasks} />
                            </>
                        ),
                    }}
                    FloatingComponent={
                        <View
                            style={{
                                position: 'absolute',
                                bottom: isIOS ? -bottomInset.bottom : 0,
                                left: 15,
                                right: 15,
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    zIndex: 5,
                                }}
                            >
                                <View
                                    style={{
                                        width: '75%',
                                        marginRight: 20,
                                    }}
                                >
                                    <AdsButton
                                        promotionId={params.goal.id}
                                        title={params.goal.ctaTitle}
                                        href={params.goal.promotionUrl}
                                    />
                                </View>
                                <Animated.View style={[animatedScaleStyle]}>
                                    <DropShadow
                                        style={{
                                            shadowColor: '#00000026',
                                            shadowOffset: {
                                                width: 2,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.15,
                                            shadowRadius: 15,
                                        }}
                                    >
                                        <CopyGoalAdsGoalContainer>
                                            <TouchableWithoutFeedback
                                                onPressIn={onPressIn}
                                                onPressOut={onPressOut}
                                                onPress={copyGoal}
                                            >
                                                <AlternativeCopyIcon />
                                            </TouchableWithoutFeedback>
                                        </CopyGoalAdsGoalContainer>
                                    </DropShadow>
                                </Animated.View>
                            </View>

                            <View
                                style={{
                                    height:
                                        isIOS && !isEqual(bottomInset.bottom, 0)
                                            ? bottomInset.bottom
                                            : 24,
                                    width: '100%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    zIndex: 2,
                                }}
                            ></View>
                        </View>
                    }
                    {...optionalProps}
                />
            </GoalPageContainer>
            <LoadingFull loading={loading} />
            <PopupNormalOK
                animationIn={'slideInDown'}
                show={isCopySuccess}
                setShow={setShowPopupCopySuccess}
                onModalHide={finalizePopup}
                image={<ImageBerhasilDiubah />}
                title={'Goals Berhasil\nDitambahkan'}
                noButton
            />
            <PopUpFailed
                show={show_popup_failed}
                setShow={setShowFailed}
                title={'Whoops!'}
                image={<ImageBelumAdaTask />}
                text={`Goals ${goalName} sudah kamu copy😊`}
                cancelable
                onOK={onOKhandler}
                onModalHide={finalizePopup}
            />
        </DocheckSafeAreaView>
    )
}

const styles = StyleSheet.create({
    goalPageContainer: { backgroundColor: '#262D33' },
    scrollView: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    withPadding: {
        paddingLeft: newPaddingSize,
        paddingRight: newPaddingSize,
        marginBottom: swipeableHideYPosition + TouchHeadHeight,
    },
    ownerTitle: {
        color: '#262D33',
        marginLeft: 12,
    },
    spaceBetweenContainer: {
        marginRight: '15%',
    },
    detailCopyIcon: {
        color: '#888888',
        marginLeft: 8,
    },
    modalMain: {
        backgroundColor: '#0000',
        shadowOpacity: 0,
        elevation: 0,
        overflow: 'hidden',
    },
    overlayMain: {
        backgroundColor: '#0001',
        shadowOpacity: 0,
        elevation: 0,
    },
    childrenMain: {
        backgroundColor: '#FFF',
        overflow: 'hidden',
    },
    emptyTask: {
        marginTop: 25,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
})
