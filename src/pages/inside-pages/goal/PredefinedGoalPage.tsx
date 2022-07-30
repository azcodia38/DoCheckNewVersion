/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

import React, { useCallback, useMemo, useState } from 'react'
import { isEqual, uniqueId } from 'lodash'
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { useDispatch } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// @entity
import { Goals } from 'src/entity/Goals.entity'

// @helpers
import { getPlaceholderImage, NavProps } from 'src/utils/const'
import {
    CopyGoalContainer,
    GoalPageContainer,
    ImageUserPredefinedGoal,
} from './styled'
import { isIOS, share } from 'src/utils'
import { shareGoalMessage } from 'src/utils/module/templateLiterral'
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
import {
    ContainerAlignItemsCenter,
    SpaceBetweenContainerCenter,
} from 'components/goalCard/styled'
import Header from 'components/header/Header'
import {
    CopyGoalIcon,
    DetailGoalTotalCopyIcon,
    DetailGoalTotalTaskIcon,
    DetailGoalTotalViewIcon,
    ImageBelumAdaTask,
    ImageBerhasilDiubah,
    ShareIcon,
} from 'components/icons/Icons'
import ItemTask from 'components/item-task/ItemTask'
import Space from 'src/components/atoms/space'
import Tipografi from 'src/components/atoms/tipografi'
import WithPadding from 'src/components/atoms/withPadding'
import PopupNormalOK from 'components/popup/normal-ok/PopupNormalOK'
import LoadingFull from 'components/loading/LoadingFull'
import DocheckSafeAreaView from 'src/components/atoms/docheckSafeAreaView'
import TouchHeadTask from 'src/components/atoms/touchHeadTask'
import { TaskListLoading } from 'components/loader-collections'
import NotLoadingButEmpty from 'src/components/atoms/descriptionGoal/notLoadingButEmpty'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'

// @hook
import useUtils from 'src/hook/useUtils'
import useAuthorization from 'src/hook/useAuthorization'
import { setCopyGoal } from 'src/store/actions'
import useConnected from 'src/hook/useConnected'
import { hasNotch } from 'react-native-device-info'
import useDimension from 'src/hook/useDimension'
import useAnimation from 'src/hook/useAnimation'
import useDescriptionHeight from 'src/hook/useDescriptionHeight'
import Button from 'src/components/atoms/button'

const { TouchHeadHeight, newPaddingSize, swipeableHideYPosition } = useUtils()

interface PredefinedGoalPageProps extends NavProps {}

export default function PredefinedGoalPage(props: PredefinedGoalPageProps) {
    const dispatch = useDispatch()
    const params: PredefinedGoalPageParams = props.route.params
    const auth = useAuthorization(props.navigation)
    const { connected } = useConnected()
    const { height } = useDimension()
    const { onPressIn, onPressOut, animatedScaleStyle } = useAnimation()
    const bottomInset = useSafeAreaInsets()

    // @state
    const [isCopySuccess, setShowPopupCopySuccess] = useState<boolean>(false)
    const [show_popup_failed, setShowFailed] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [copiedGoal, setCopiedGoal] = useState<Goals>()

    const userFullname = useMemo(
        () => params.goal.owner?.fullname ?? '',
        [params.goal.owner?.fullname]
    )
    const optionalProps = useMemo(
        () => ({
            [isIOS ? 'modalHeight' : '']: hasNotch() ? height / 1.2 : height,
        }),
        [isIOS, hasNotch, height]
    )
    const goalName = useMemo(() => params.goal.name ?? '', [params.goal.name])
    const isOpenModal = useMemo(() => height / 2, [height])

    const { descriptionHeight } = useDescriptionHeight(isOpenModal)

    const onOKhandler = useCallback(() => {
        setShowFailed(false)
    }, [setShowFailed])

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

    const shareGoal = useCallback(() => {
        const message = shareGoalMessage(
            params.goal?.owner?.fullname,
            params.goal?.name,
            params.goal.id
        )
        share(message)
    }, [share, shareGoalMessage])

    return (
        <DocheckSafeAreaView>
            <GoalPageContainer style={styles.goalPageContainer}>
                <ScrollView style={styles.scrollView}>
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
                            />
                            <Space value={7} />
                            <View style={{ width: '100%' }}>
                                <ContainerAlignItemsCenter>
                                    {
                                        <ImageUserPredefinedGoal
                                            source={
                                                params.goal.owner
                                                    ?.profilePicture
                                                    ? {
                                                          uri: params.goal.owner
                                                              ?.profilePicture,
                                                      }
                                                    : getPlaceholderImage(
                                                          params.goal.owner
                                                              ?.gender
                                                      )
                                            }
                                        />
                                    }
                                    <Tipografi
                                        type={'label-regular'}
                                        style={styles.ownerTitle}
                                    >
                                        {userFullname}
                                    </Tipografi>
                                </ContainerAlignItemsCenter>
                                <Space value={25} />
                            </View>
                            <Text>
                                <Tipografi
                                    type={'title'}
                                    style={{ color: '#000' }}
                                >
                                    {goalName}
                                </Tipografi>
                                <Text>{'  '}</Text>
                                <ShareIcon onPress={shareGoal} />
                                <Text>{'  '}</Text>
                            </Text>
                            <Space value={18} />
                            <SpaceBetweenContainerCenter
                                style={styles.spaceBetweenContainer}
                            >
                                <ContainerAlignItemsCenter>
                                    <DetailGoalTotalCopyIcon />
                                    <Tipografi
                                        type={'small'}
                                        style={styles.detailCopyIcon}
                                    >
                                        {`${0}`}
                                    </Tipografi>
                                </ContainerAlignItemsCenter>
                                <ContainerAlignItemsCenter>
                                    <DetailGoalTotalViewIcon />
                                    <Tipografi
                                        type={'small'}
                                        style={styles.detailCopyIcon}
                                    >
                                        {`${params.goal.totalView}`}
                                    </Tipografi>
                                </ContainerAlignItemsCenter>
                                <ContainerAlignItemsCenter>
                                    <DetailGoalTotalTaskIcon />
                                    <Tipografi
                                        type={'small'}
                                        style={styles.detailCopyIcon}
                                    >
                                        {`${
                                            (params.goal.tasks ?? []).length
                                        } Task`}
                                    </Tipografi>
                                </ContainerAlignItemsCenter>
                            </SpaceBetweenContainerCenter>
                            <Space value={18} />
                            <Tipografi
                                type={'normal'}
                                style={{ lineHeight: 23 }}
                            >
                                <DescriptionGoals
                                    description={params.goal.description}
                                />
                            </Tipografi>
                            <Space value={30} />
                        </View>
                    </WithPadding>
                </ScrollView>
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
                        <>
                            {/* <TouchableWithoutFeedback
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                                onPress={copyGoal}
                            >
                                <Animated.View style={[animatedScaleStyle]}>
                                    <CopyGoalContainer>
                                        <CopyGoalIcon />
                                    </CopyGoalContainer>
                                </Animated.View>
                            </TouchableWithoutFeedback> */}

                            <Button
                                onPress={copyGoal}
                                style={{ borderRadius: 0 }}
                            >
                                <CopyGoalIcon />{' '}
                                <Tipografi
                                    style={{ color: '#fff' }}
                                    type="medium"
                                >
                                    Copy Goals
                                </Tipografi>
                            </Button>

                            {Boolean(isIOS) && (
                                <View
                                    style={{
                                        height:
                                            Boolean(isIOS) &&
                                            !isEqual(bottomInset.bottom, 0)
                                                ? bottomInset.bottom
                                                : 24,
                                        width: '100%',
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.9)',
                                        zIndex: 2,
                                    }}
                                ></View>
                            )}
                        </>
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
    goalPageContainer: { backgroundColor: '#D8FAD4' },
    scrollView: {
        flexDirection: 'column',
        width: '100%',
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
