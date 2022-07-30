import { theme } from 'src/utils/const'
import { useCallback } from 'react'
import { StyleProp, TextStyle } from 'react-native'

type UseInputStyle = (
    inputContainerStyle: any,
    setInputContainerStyles: any,
    propsInputContainerStyle: StyleProp<TextStyle>
) => {
    onFocusHandler: () => void
    onBlurHandler: () => void
}

const useInputStyle: UseInputStyle = (
    inputContainerStyle,
    setInputContainerStyles,
    propsInputContainerStyle
) => {
    const onFocusHandler = useCallback(() => {
        setInputContainerStyles({
            borderColor: theme.main_color,
            backgroundColor: theme.background,
            ...(propsInputContainerStyle as {}),
        })
    }, [inputContainerStyle, setInputContainerStyles])

    const onBlurHandler = useCallback(() => {
        setInputContainerStyles({
            ...(propsInputContainerStyle as {}),
        })
    }, [inputContainerStyle, setInputContainerStyles])

    return {
        onFocusHandler,
        onBlurHandler,
    }
}

export default useInputStyle
