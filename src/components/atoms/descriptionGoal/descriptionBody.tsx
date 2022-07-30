import React from 'react'
import { ScrollView, View } from 'react-native'

// @components
import { SpaceBetweenContainerCenter } from 'components/goalCard/styled'
import Header from 'components/header/Header'
import Space from 'src/components/atoms/space'
import WithPadding from 'src/components/atoms/withPadding'
import MemberGoal from 'src/components/atoms/memberGoal'
import ProgressbarDescription from 'src/components/molecules/detailGoal/progressbarDescription'
import ProgressDescription from 'src/components/molecules/detailGoal/progressDescription'
import DescriptionWrapper from 'src/components/molecules/descriptionDetailGoal/descriptionWrapper'

// @helpers
import WithDescriptionBodyHOC, {
    WithDescriptionBodyProps,
} from 'src/hoc/withDescriptionBody'

const loadingMemberlist = false

export default WithDescriptionBodyHOC(function DescriptionBody({
    newPaddingSize,
    navigation,
    goalInnerTitle,
    goalMemberWaitingMapID,
    setShowPopupMemberGoal,
    goalMemberMapID,
    members,
    isOwner,
    goal,
    marginBottomSpace,
    fontContent = 'dark',
    goalTitle,
    descriptionHeight,
    rightSectionViewHeader,
    isReadOnly,
    isPublic,
    scrollingHandler,
    loadingPublic,
    progress,
    progressTask,
    setPublic,
    shareGoal,
}: WithDescriptionBodyProps) {
    return (
        <WithPadding
            style={{
                paddingLeft: newPaddingSize,
                paddingRight: newPaddingSize,
                display: 'flex',
                height: descriptionHeight,
                width: '100%',
                flexDirection: 'column',
            }}
        >
            <Header
                titleDetail={goalTitle}
                navigation={navigation}
                rightSectionView={rightSectionViewHeader}
                withBack
                grayArrow
                withBackgroundDevelopmentMode={false}
                isSharedTemplate={isPublic}
                type="big-title"
                fontContent={fontContent}
            />
            <Space value={7} />
            <ScrollView
                style={{ flex: 1, width: '100%' }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollingHandler}
            >
                <SpaceBetweenContainerCenter
                    style={{
                        flexDirection: 'column',
                        width: '100%',
                        marginBottom: marginBottomSpace,
                    }}
                >
                    <DescriptionWrapper
                        goalInnerTitle={goalInnerTitle}
                        isOwner={isOwner}
                        isPinned={goal?.isPinned ?? false}
                        isPublic={isPublic}
                        isReadOnly={isReadOnly}
                        loadingPublic={loadingPublic}
                        setPublic={setPublic}
                        shareGoal={shareGoal}
                        description={goal?.description}
                    />
                    <Space value={24} />
                    <View style={{ width: '100%' }}>
                        <ProgressDescription progressTask={progressTask} />
                        <Space value={15} />
                        <ProgressbarDescription progress={progress} />
                        <Space value={15} />
                        <MemberGoal
                            goalMemberMapID={goalMemberMapID}
                            goalMemberWaitingMapID={goalMemberWaitingMapID}
                            loading={loadingMemberlist}
                            members={members}
                            setShowPopupMemberGoal={setShowPopupMemberGoal}
                        />
                        <Space value={20} />
                    </View>
                </SpaceBetweenContainerCenter>
            </ScrollView>
        </WithPadding>
    )
})
