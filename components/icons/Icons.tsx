import React, { useMemo } from 'react'
import {
    Animated,
    Easing,
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TouchableWithoutFeedback as TouchableIOS } from 'react-native'
import { TouchableWithoutFeedback as TouchableAndroid } from 'react-native-gesture-handler'

import { theme } from 'src/utils/const'
import Images from 'src/assets'
import useAnimation from 'src/hook/useAnimation'
import { isAndroid } from 'src/utils'
import TouchableWithoutFeedback from 'src/components/atoms/touchableWithoutFeedback'

interface IconsStyle {
    style?: StyleProp<ImageStyle>
    disabled?: boolean
    onPress?(): void
    menuToggle?: boolean
    accessibilityLabel?: string
}

const checkBox = {
    height: 25,
    width: 25,
}

export function TickIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 12,
                    width: 12,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.tickIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function GoogleIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 28,
                    width: 28,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.googleIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function FacebookIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 28,
                    width: 28,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.facebookIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function EmailIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.emailIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function LockIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.lockIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function CalendarIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 24,
                    width: 24,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.calendarIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function ShowPasswordIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.showPasswordIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function HidePasswordIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.hidePassword}
            />
        </TouchableWithoutFeedback>
    )
}

export function CheckOnIcon(props: IconsStyle) {
    const { buttonScale, onPressHandler, onPressIn, onPressOut } =
        useAnimation()

    const animatedScaleStyle = useMemo(
        () => ({
            transform: [{ scale: buttonScale }],
        }),
        [buttonScale]
    )

    const childrenCheck = useMemo(
        () => (
            <Animated.View style={[animatedScaleStyle]}>
                <Image
                    style={{
                        height: 22,
                        width: 22,
                        resizeMode: 'contain',
                        // transform: [{ scale: buttonScale }],
                        ...((props.style as any) ?? {}),
                    }}
                    source={Images.checkOn}
                />
            </Animated.View>
        ),
        [animatedScaleStyle, props.style, Images.checkOn]
    )

    return (
        <>
            {Boolean(isAndroid) && (
                <TouchableAndroid
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={() => onPressHandler(props.onPress!)}
                >
                    <Animated.View style={[animatedScaleStyle]}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                // transform: [{ scale: buttonScale }],
                                ...((props.style as any) ?? {}),
                            }}
                            source={Images.checkOn}
                        />
                    </Animated.View>
                </TouchableAndroid>
            )}
            {!Boolean(isAndroid) && (
                <TouchableIOS
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={() => onPressHandler(props.onPress!)}
                >
                    {childrenCheck}
                </TouchableIOS>
            )}
        </>
    )
}

export function CheckOffIcon(props: IconsStyle) {
    const { buttonScale, onPressHandler, onPressIn, onPressOut } =
        useAnimation()

    const animatedScaleStyle = useMemo(
        () => ({
            transform: [{ scale: buttonScale }],
        }),
        [buttonScale]
    )

    const childrenCheck = useMemo(
        () => (
            <Animated.View style={[animatedScaleStyle]}>
                <Image
                    style={{
                        height: 22,
                        width: 22,
                        resizeMode: 'contain',
                        // transform: [{ scale: buttonScale }],
                        ...((props.style as any) ?? {}),
                    }}
                    source={Images.checkOff}
                />
            </Animated.View>
        ),
        [animatedScaleStyle, props.style, Images.checkOff]
    )

    return (
        <>
            {Boolean(isAndroid) && (
                <TouchableAndroid
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={() => onPressHandler(props.onPress!)}
                >
                    <Animated.View style={[animatedScaleStyle]}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                // transform: [{ scale: buttonScale }],
                                ...((props.style as any) ?? {}),
                            }}
                            source={Images.checkOff}
                        />
                    </Animated.View>
                </TouchableAndroid>
            )}
            {!Boolean(isAndroid) && (
                <TouchableIOS
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={() => onPressHandler(props.onPress!)}
                >
                    {childrenCheck}
                </TouchableIOS>
            )}
        </>
    )
}

export function ImageLupaKataSandi(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 150,
                    width: '75%',
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.forgetPasswordIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function ImageBerhasilDiubah(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 200,
                    width: '85%',
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.successChangedSomethingIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function ImageDaftarTersimpan(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 200,
                    width: '85%',
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.listHasSaved}
            />
        </TouchableWithoutFeedback>
    )
}

export function ArrowDownIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 14,
                    width: 14,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.arrowDownIcon}
            />
        </TouchableWithoutFeedback>
    )
}

function NavBottomIcon(source: ImageSourcePropType, props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    marginBottom: 4,
                    ...((props.style as any) ?? {}),
                }}
                source={source}
            />
        </TouchableWithoutFeedback>
    )
}
export const NavBottomHomeOnIcon = (props: IconsStyle) =>
    NavBottomIcon(Images.navBottomHomeonIcon, props)
export const NavBottomHomeOffIcon = (props: IconsStyle) =>
    NavBottomIcon(Images.navBottomHomeoffIcon, props)
export const NavBottomSearchOnIcon = (props: IconsStyle) =>
    NavBottomIcon(Images.searchOn, props)
export const NavBottomSearchOffIcon = (props: IconsStyle) =>
    NavBottomIcon(Images.searchOff, props)
export const NavBottomNotificationOnIcon = (props: IconsStyle) =>
    NavBottomIcon(Images.notificationOn, props)
export const NavBottomNotificationOffIcon = (props: IconsStyle) =>
    NavBottomIcon(Images.notificationOff, props)
export const NavBottomProfileOnIcon = (props: IconsStyle) =>
    NavBottomIcon(Images.profileOn, props)
export const NavBottomProfileOffIcon = (props: IconsStyle) =>
    NavBottomIcon(Images.profileOff, props)

export function PlusIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.plusIcon}
        />
    )
}

export function SearchGrayIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    aspectRatio: 1,
                    zIndex: 1,
                    ...((props.style as any) ?? {}),
                }}
                source={Images.searchGray}
            />
        </TouchableWithoutFeedback>
    )
}

export function CloseGrayIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    aspectRatio: 1,
                    zIndex: 1,
                    ...((props.style as any) ?? {}),
                }}
                source={Images.closeIconGray}
            />
        </TouchableWithoutFeedback>
    )
}

export function SmallPinIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 14,
                    width: 14,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.smallPinIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function SmallHeartIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 14,
                    width: 14,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.smallHeartIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function SmallProfileIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 14,
                    width: 14,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.smallProfileIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function PencilEditIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View
                style={{
                    padding: 20,
                    marginLeft: -20,
                    marginTop: 6,
                }}
            >
                <Image
                    style={{
                        height: 17,
                        width: 17,
                        resizeMode: 'contain',
                        ...((props.style as any) ?? {}),
                    }}
                    source={Images.pencilEditIcon}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export function ArrowRightIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={
                    (props.disabled
                        ? Images.arrowRight.disable
                        : Images.arrowRight.active) as ImageSourcePropType
                }
            />
        </TouchableWithoutFeedback>
    )
}

export function GoalCardPaperIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.taskIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function GoalCardShareIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.goalCardShare}
            />
        </TouchableWithoutFeedback>
    )
}

export function TickOffIcon(props: IconsStyle & { withOnPress?: boolean }) {
    const buttonBody = useMemo(
        () => (
            <Image
                style={{
                    height: checkBox.height,
                    width: checkBox.width,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.tickOffIcon}
            />
        ),
        [checkBox, Images]
    )
    return (
        <>
            {props.withOnPress && (
                <TouchableWithoutFeedback onPress={props.onPress}>
                    {buttonBody}
                </TouchableWithoutFeedback>
            )}
            {!props.withOnPress && buttonBody}
        </>
    )
}

export function TickOnIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: checkBox.height,
                width: checkBox.width,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.tickOnIcon}
        />
    )
}

export function TickOffRedIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: checkBox.height,
                width: checkBox.width,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.tickOffTaskRed}
        />
    )
}

export function TickOnRedIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: checkBox.height,
                width: checkBox.width,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.tickOnTaskRed}
        />
    )
}

export function RepeatTaskIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 12,
                width: 12,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.repeat}
        />
    )
}

export function CalendarTaskIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 10,
                width: 10,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.calendarTask}
        />
    )
}

export function CalendarTaskRedIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 10,
                width: 10,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.calendarTaskRed}
        />
    )
}

export function ThreeDotsIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.threeDots}
            />
        </TouchableWithoutFeedback>
    )
}

export function LampIdeaIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.lampIdea}
            />
        </TouchableWithoutFeedback>
    )
}

export function Repeat2Icon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.repeatAlternate}
        />
    )
}

export function AddUserIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.addUser}
        />
    )
}

export function PlusGreenIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.plusGreen}
            />
        </TouchableWithoutFeedback>
    )
}

export function ReloadIcon(props: IconsStyle) {
    const spinValue = new Animated.Value(props.menuToggle ? 0 : 1)

    // First set up animation
    if (props.menuToggle) {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true, // To make use of native driver for performance
        }).start()
    }

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Animated.Image
                style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                    transform: [{ rotate: spin }],
                }}
                source={Images.reloadIcon}
            />
            {/* <Image
            style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={require('src/assets/images/reload.png')} */}
        </TouchableWithoutFeedback>
    )
}

export function PlusOGreenIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View
                style={{
                    padding: 6,
                    paddingRight: 6.5,
                    paddingBottom: 6.5,
                    borderRadius: 999,
                    borderStyle: 'solid',
                    borderWidth: 1.3,
                    borderColor: theme.main_color,
                }}
            >
                <Image
                    style={{
                        height: 12,
                        width: 12,
                        resizeMode: 'contain',
                        ...((props.style as any) ?? {}),
                    }}
                    source={Images.plusGreen}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export function TickEditTaskIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback
            accessibilityLabel={props.accessibilityLabel}
            onPress={props.onPress}
        >
            <Image
                style={{
                    height: 18,
                    width: 18,
                    marginTop: 3,
                    marginBottom: 3,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.tickEditTask}
            />
        </TouchableWithoutFeedback>
    )
}

export function TickCloseTaskIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 18,
                    width: 18,
                    marginTop: 3,
                    marginBottom: 3,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.tickCloseTask}
            />
        </TouchableWithoutFeedback>
    )
}

export function MenuTaskDeleteIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.menuTaskDelete}
            />
        </TouchableWithoutFeedback>
    )
}

export function MenuTaskPinIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.menuTaskPin}
            />
        </TouchableWithoutFeedback>
    )
}

export function MenuTaskEditIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.menuTaskEdit}
            />
        </TouchableWithoutFeedback>
    )
}

export function ImageSimpanPerubahan(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 150,
                width: '75%',
                resizeMode: 'contain',
                alignSelf: 'center',
                ...((props.style as any) ?? {}),
            }}
            source={Images.successSave}
        />
    )
}

export function MenuGoalJadikanTempalateIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 17,
                    width: 17,
                    marginRight: -2,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.goalBecomeTemplate}
            />
        </TouchableWithoutFeedback>
    )
}

export function MenuGoalTambahTaskIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 17,
                    width: 17,
                    marginRight: -2,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.addingTask}
            />
        </TouchableWithoutFeedback>
    )
}

export function MenuGoalTambahTemanIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 17,
                    width: 17,
                    marginRight: -2,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.addingFriendinGoal}
            />
        </TouchableWithoutFeedback>
    )
}

export function PlusOIcon(props: IconsStyle) {
    return (
        <View
            style={{
                padding: 15,
                borderRadius: 999,
                backgroundColor: theme.main_color,
            }}
        >
            <Image
                style={{
                    height: 12,
                    width: 12,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.plusIcon}
            />
        </View>
    )
}

export function ImageBelumAdaTask(
    props: IconsStyle & { height?: number; width?: string }
) {
    const heightMemo = useMemo(
        () => (props.height ? props.height : 130),
        [props.height]
    )
    const widthMemo = useMemo(
        () => (props.width ? props.width : '75%'),
        [props.width]
    )

    return (
        <Image
            style={{
                height: heightMemo,
                width: widthMemo,
                resizeMode: 'contain',
                alignSelf: 'center',
                ...((props.style as any) ?? {}),
            }}
            source={Images.emptyTask}
        />
    )
}

export function EmptySearchIllustration(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 130,
                width: '75%',
                resizeMode: 'contain',
                alignSelf: 'center',
                ...((props.style as any) ?? {}),
            }}
            source={Images.emptySearch}
        />
    )
}

export function OfflineModeCanvas(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 130,
                width: '75%',
                resizeMode: 'contain',
                alignSelf: 'center',
                ...((props.style as any) ?? {}),
            }}
            source={Images.offlineMode}
        />
    )
}

export function PlusSquareIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 19,
                width: 19,
                marginBottom: -2.5,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.plusSquare}
        />
    )
}

export function CalendarCreateTaskIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 24,
                width: 24,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.calendarCreateTask}
        />
    )
}

export function Repeat3Icon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 24,
                width: 24,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.repeatAlternateSecond}
        />
    )
}

export function AddUserGrayIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.addUserGray}
        />
    )
}

export function ArrowDownGrayIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 22,
                width: 22,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.arrowDownGrayIcon}
        />
    )
}

export function PlusGrayIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 28,
                width: 28,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.plusGrayIcon}
        />
    )
}

export function ImageBerhasilDisimpan(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 130,
                width: '75%',
                resizeMode: 'contain',
                alignSelf: 'center',
                ...((props.style as any) ?? {}),
            }}
            source={Images.imageSuccessedSave}
        />
    )
}

export function ImageBerhasilPinGoal(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 130,
                width: '75%',
                resizeMode: 'contain',
                alignSelf: 'center',
                ...((props.style as any) ?? {}),
            }}
            source={Images.imageSuccessed}
        />
    )
}

export function ArrowRightChevronIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 15,
                width: 15,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.arrowRightChevIcon}
        />
    )
}

export function PinTaskIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 11,
                width: 11,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.pinTaskIcon}
        />
    )
}

export function SearchGreenIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.searchIconColorGreen}
            />
        </TouchableWithoutFeedback>
    )
}

export function CopyRecommendationGoalIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 24,
                    width: 24,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.copyRecommendationGoalIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function PredefinedGoalTotalCopyIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.predefineGoalTotalCopyIcon}
        />
    )
}

export function PredefinedGoalTotalViewIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.predefinedGoalTotalViewIcon}
        />
    )
}

export function PredefinedGoalTotalTaskIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.predefinedGoalTotalTaskIcon}
        />
    )
}

export function CopyGoalIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.copyGoalIcon}
        />
    )
}

export function MenuGoalsPilihIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.menuGoalChoosenIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function OtherUserProfileIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 11,
                width: 11,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.otherUserProfileIcon}
        />
    )
}

export function OtherUserPinIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 11,
                width: 11,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.otherUserPinIcon}
        />
    )
}

export function OtherUserJobIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 11,
                width: 11,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.otherUserJobIcon}
        />
    )
}

export function ArrowRightGreenIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.arrowRightIcon}
        />
    )
}

export function TickSquareIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 6,
                width: 6,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.tickSquareIcon}
        />
    )
}

export function ImageKeluar(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 150,
                    width: '75%',
                    marginTop: 12,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.logoutIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function RecommendationTotalCopyIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.recommendationTotalCopyIcon}
        />
    )
}

export function RecommendationTotalViewIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.recommendationTotalViewIcon}
        />
    )
}

export function RecommendationTotalCopyWhiteIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.recommendationTotalCopyWhiteIcon}
        />
    )
}

export function RecommendationTotalViewWhiteIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.recommendationTotalViewWhiteIcon}
        />
    )
}

export function ShareIcon(props: IconsStyle) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image
                style={{
                    height: 16,
                    width: 16,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.shareIcon}
            />
        </TouchableOpacity>
    )
}

export function DetailGoalTotalCopyIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.detailGoalTotalCopyIcon}
        />
    )
}

export function DetailGoalTotalViewIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.detailGoalTotalViewCountIcon}
        />
    )
}

export function DetailGoalTotalTaskIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.detailGoalTotalTaskIcon}
        />
    )
}

export function LinkRekomendasiIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.linkRecommendationIcon}
        />
    )
}

export function LinkRekomendasiGreenIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.recommendationLinkActive}
        />
    )
}

export function ImageNoReferal(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 130,
                width: '45%',
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: 36,
                marginBottom: 36,
                ...((props.style as any) ?? {}),
            }}
            source={Images.noReferralIcon}
        />
    )
}

export function CameraIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.cameraIcon}
        />
    )
}

export function ImageTidakAdaNotif(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 130,
                width: '45%',
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: 36,
                marginBottom: 36,
                ...((props.style as any) ?? {}),
            }}
            source={Images.imageNoNotif}
        />
    )
}

export function ImageYesNo(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 130,
                width: '50%',
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 36,
                ...((props.style as any) ?? {}),
            }}
            source={Images.imageYesNo}
        />
    )
}

export function WaitingGoalInvitationIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.waitingGoalInvitation}
        />
    )
}

export function RekomendasiPlusIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 12,
                width: 12,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.recommendationPlusIcon}
        />
    )
}

export function RekomendasiCheckIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 12,
                width: 12,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.recommendationCheckIcon}
        />
    )
}

export function ImageTidakAdaInternet(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 150,
                width: '60%',
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 36,
                ...((props.style as any) ?? {}),
            }}
            source={Images.noInternetIcon}
        />
    )
}

export function DeleteAudioIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.deleteAudioIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function PauseIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View
                style={{
                    padding: 12,
                    marginLeft: -12,
                }}
            >
                <Image
                    style={{
                        height: 16,
                        width: 16,
                        resizeMode: 'contain',
                        ...((props.style as any) ?? {}),
                    }}
                    source={Images.pauseIcon}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export function PlayIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View
                style={{
                    padding: 12,
                    marginLeft: -12,
                }}
            >
                <Image
                    style={{
                        height: 16,
                        width: 16,
                        resizeMode: 'contain',
                        ...((props.style as any) ?? {}),
                    }}
                    source={Images.playIcon}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export function StopIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.stopIcon}
            />
        </TouchableWithoutFeedback>
    )
}

export function VoiceIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 22,
                width: 22,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.voiceIcon}
        />
    )
}

export function ArrowRightDisableGoalIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.rightIconDisableChevron}
        />
    )
}

export function LockGoalIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.lockIconLine}
        />
    )
}

export function UnlockGoalIcon(props: IconsStyle) {
    return (
        <Image
            style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                ...((props.style as any) ?? {}),
            }}
            source={Images.unlockIconLine}
        />
    )
}

export function ArrowRightIconWhite(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.rightWhite as ImageSourcePropType}
            />
        </TouchableWithoutFeedback>
    )
}

export function AlternativeCopyIcon(props: IconsStyle) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Image
                style={{
                    height: 30,
                    width: 30,
                    resizeMode: 'contain',
                    ...((props.style as any) ?? {}),
                }}
                source={Images.alternativeCopy as ImageSourcePropType}
            />
        </TouchableWithoutFeedback>
    )
}
