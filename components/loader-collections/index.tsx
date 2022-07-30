import React from 'react'
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'
import { View } from 'react-native'
import WithPadding from 'src/components/atoms/withPadding'

export const GoalCardLoading = () => (
    <View style={{ height: 160 }}>
        <WithPadding>
            <ContentLoader
                speed={2}
                height={160}
                viewBox="0 0 327 150"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <Rect x="0" y="0" rx="18" ry="18" width="327" height="150" />
                <Path d="M 16 26 h 163 v 22 H 16 z M 16 58 h 117 v 17 H 16 z M 19 94 h 244 v 18 H 19 z M 280 96 h 25 v 13 h -25 z" />
                <Circle cx="306" cy="22" r="14" />
            </ContentLoader>
        </WithPadding>
    </View>
)

export const TaskListLoading = () => (
    <View style={{ height: 200 }}>
        <ContentLoader viewBox="0 0 300 180">
            <Rect
                x="0"
                y={55 * 0 + 8 * 0}
                rx="6"
                ry="6"
                width="300"
                height="55"
            />
            <Rect
                x="13"
                y={55 * 0 + 20 + 8 * 0}
                rx="4"
                ry="4"
                width="15"
                height="15"
            />
            <Rect
                x="38"
                y={55 * 0 + 15 + 8 * 0}
                rx="2"
                ry="2"
                width="180"
                height="10"
            />
            <Rect
                x="38"
                y={55 * 0 + 32 + 8 * 0}
                rx="2"
                ry="2"
                width="100"
                height="8"
            />

            <Rect
                x="0"
                y={55 * 1 + 8 * 1}
                rx="6"
                ry="6"
                width="300"
                height="55"
            />
            <Rect
                x="13"
                y={55 * 1 + 20 + 8 * 1}
                rx="4"
                ry="4"
                width="15"
                height="15"
            />
            <Rect
                x="38"
                y={55 * 1 + 15 + 8 * 1}
                rx="2"
                ry="2"
                width="160"
                height="10"
            />
            <Rect
                x="38"
                y={55 * 1 + 32 + 8 * 1}
                rx="2"
                ry="2"
                width="120"
                height="8"
            />

            <Rect
                x="0"
                y={55 * 2 + 8 * 2}
                rx="6"
                ry="6"
                width="300"
                height="55"
            />
            <Rect
                x="13"
                y={55 * 2 + 20 + 8 * 2}
                rx="4"
                ry="4"
                width="15"
                height="15"
            />
            <Rect
                x="38"
                y={55 * 2 + 15 + 8 * 2}
                rx="2"
                ry="2"
                width="140"
                height="10"
            />
            <Rect
                x="38"
                y={55 * 2 + 32 + 8 * 2}
                rx="2"
                ry="2"
                width="80"
                height="8"
            />
        </ContentLoader>
    </View>
)

export const GoalRecommendationLoading = () => (
    <View style={{ height: 100 }}>
        <WithPadding>
            <ContentLoader viewBox="0 0 300 90">
                <Rect x="0" y="0" rx="10" ry="10" width="210" height="88" />
                <Rect x="20" y="45" rx="4" ry="4" width="120" height="10" />
                <Rect x="20" y="61" rx="4" ry="4" width="80" height="10" />
            </ContentLoader>
        </WithPadding>
    </View>
)

export const TaskParticipantListLoading = () => (
    <View style={{ height: 200, marginLeft: -10 }}>
        <WithPadding>
            <ContentLoader viewBox="0 0 300 200">
                <Circle cx="28" cy={26 + 62 * 0 + 15} r="25" />
                <Rect
                    x="65"
                    y={8 + 62 * 0 + 15}
                    rx="4"
                    ry="4"
                    width="120"
                    height="15"
                />
                <Rect
                    x="65"
                    y={29 + 62 * 0 + 15}
                    rx="4"
                    ry="4"
                    width="80"
                    height="10"
                />

                <Circle cx="28" cy={26 + 62 * 1 + 15} r="25" />
                <Rect
                    x="65"
                    y={8 + 62 * 1 + 15}
                    rx="4"
                    ry="4"
                    width="120"
                    height="15"
                />
                <Rect
                    x="65"
                    y={29 + 62 * 1 + 15}
                    rx="4"
                    ry="4"
                    width="80"
                    height="10"
                />

                <Circle cx="28" cy={26 + 62 * 2 + 15} r="25" />
                <Rect
                    x="65"
                    y={8 + 62 * 2 + 15}
                    rx="4"
                    ry="4"
                    width="120"
                    height="15"
                />
                <Rect
                    x="65"
                    y={29 + 62 * 2 + 15}
                    rx="4"
                    ry="4"
                    width="80"
                    height="10"
                />
            </ContentLoader>
        </WithPadding>
    </View>
)

export const ParticipantListLoading = () => (
    <View style={{ height: 49, marginLeft: -23, marginTop: -6 }}>
        <WithPadding>
            <ContentLoader viewBox="0 0 300 49">
                <Circle cx={28 + 37 * 0} cy={28} r="28" />
                <Circle cx={28 + 37 * 1} cy={28} r="28" />
                <Circle cx={28 + 37 * 2} cy={28} r="28" />
                <Circle cx={28 + 37 * 3} cy={28} r="28" />
                <Circle cx={28 + 37 * 4} cy={28} r="28" />
                <Circle cx={28 + 37 * 5} cy={28} r="28" />
            </ContentLoader>
        </WithPadding>
    </View>
)

export const ParticipantListBiggerLoading = () => (
    <View style={{ height: 52, marginLeft: -23, marginTop: -10 }}>
        <WithPadding>
            <ContentLoader foregroundColor={'#FFF'} viewBox="0 0 300 49">
                <Circle cx={20 + 32 * 0} cy={27} r="20" />
                <Circle cx={20 + 32 * 1} cy={27} r="20" />
                <Circle cx={20 + 32 * 2} cy={27} r="20" />
                <Circle cx={20 + 32 * 3} cy={27} r="20" />
                <Circle cx={20 + 32 * 4} cy={27} r="20" />
                <Circle cx={20 + 32 * 5} cy={27} r="20" />
            </ContentLoader>
        </WithPadding>
    </View>
)

export const ParticipantList2Loading = () => (
    <View style={{ height: 47, marginLeft: 0 }}>
        <ContentLoader viewBox="0 0 150 47">
            <Circle cx={150 - 23 - 28 * 0} cy={23} r="23" />
            <Circle cx={150 - 23 - 28 * 1} cy={23} r="23" />
            <Circle cx={150 - 23 - 28 * 2} cy={23} r="23" />
            <Circle cx={150 - 23 - 28 * 3} cy={23} r="23" />
        </ContentLoader>
    </View>
)

export const SearchUserListLoading = () => (
    <View style={{ height: 200, marginLeft: -24, marginTop: 8 }}>
        <WithPadding>
            <ContentLoader viewBox="0 0 300 200">
                <Circle cx="28" cy={26 + 62 * 0 + 15} r="25" />
                <Rect
                    x="65"
                    y={8 + 62 * 0 + 15}
                    rx="4"
                    ry="4"
                    width="120"
                    height="15"
                />
                <Rect
                    x="65"
                    y={29 + 62 * 0 + 15}
                    rx="4"
                    ry="4"
                    width="80"
                    height="10"
                />

                <Circle cx="28" cy={26 + 62 * 1 + 15} r="25" />
                <Rect
                    x="65"
                    y={8 + 62 * 1 + 15}
                    rx="4"
                    ry="4"
                    width="120"
                    height="15"
                />
                <Rect
                    x="65"
                    y={29 + 62 * 1 + 15}
                    rx="4"
                    ry="4"
                    width="80"
                    height="10"
                />

                <Circle cx="28" cy={26 + 62 * 2 + 15} r="25" />
                <Rect
                    x="65"
                    y={8 + 62 * 2 + 15}
                    rx="4"
                    ry="4"
                    width="120"
                    height="15"
                />
                <Rect
                    x="65"
                    y={29 + 62 * 2 + 15}
                    rx="4"
                    ry="4"
                    width="80"
                    height="10"
                />
            </ContentLoader>
        </WithPadding>
    </View>
)

export const UserProfileLoading = () => (
    <View style={{ height: 315, width: '100%', marginTop: -12 }}>
        <ContentLoader viewBox="0 0 300 315">
            <Circle cx="150" cy={53} r="40" />
            <Rect x="90" y={100} rx="4" ry="4" width="120" height="20" />
            <Rect x="110" y={130} rx="4" ry="4" width="80" height="10" />
            <Rect x="70" y={150} rx="4" ry="4" width="160" height="10" />

            <Rect x="10" y={175} rx="4" ry="4" width="70" height="15" />
            <Rect x="110" y={175} rx="4" ry="4" width="80" height="15" />
            <Rect x="220" y={175} rx="4" ry="4" width="70" height="15" />

            <Rect x="20" y={215} rx="4" ry="4" width="50" height="35" />
            <Rect x="125" y={215} rx="4" ry="4" width="50" height="35" />
            <Rect x="230" y={215} rx="4" ry="4" width="50" height="35" />

            <Rect x="0" y={270} rx="4" ry="4" width="300" height="45" />
            {/* <Rect x="10" y={160} rx="4" ry="4" width="150" height="10" /> */}
        </ContentLoader>
    </View>
)

export const PredefinedGoalCardLoading = () => (
    <View style={{ height: 190 }}>
        <WithPadding>
            <ContentLoader viewBox="0 0 300 170">
                <Rect x="0" y="0" rx="24" ry="24" width="300" height="170" />
                <Rect x="20" y="20" rx="4" ry="4" width="210" height="14" />
                <Rect x="20" y="44" rx="4" ry="4" width="60" height="14" />
                <Rect x="20" y="75" rx="4" ry="4" width="250" height="8" />
                <Rect x="20" y="90" rx="4" ry="4" width="200" height="8" />
                <Circle cx="37" cy={138} r="17" />
                <Rect x="65" y="125" rx="4" ry="4" width="76" height="10" />
                <Rect x="65" y="142" rx="4" ry="4" width="56" height="10" />
            </ContentLoader>
        </WithPadding>
    </View>
)

export const NotificationListLoading = () => (
    <View style={{ height: 250, marginTop: 24 }}>
        <ContentLoader viewBox="0 0 300 220">
            <Rect
                x="0"
                y={55 * 0 + 10 * 0}
                rx="6"
                ry="6"
                width="300"
                height="55"
            />
            <Rect
                x="0"
                y={55 * 1 + 10 * 1}
                rx="6"
                ry="6"
                width="300"
                height="55"
            />
            <Rect
                x="0"
                y={55 * 2 + 10 * 2}
                rx="6"
                ry="6"
                width="300"
                height="55"
            />
        </ContentLoader>
    </View>
)
