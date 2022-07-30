import React from 'react'
import { StyleSheet } from 'react-native'

import Button from 'src/components/atoms/button'
import { theme } from 'src/utils/const'

interface FollowOrUnfollowProps {
    isFollowed: boolean
    loadingFollow: boolean
    onFollowHandler: () => Promise<void>
}

export default function FollowOrUnfollow({
    isFollowed,
    loadingFollow,
    onFollowHandler,
}: FollowOrUnfollowProps) {
    return (
        <>
            {!isFollowed && (
                <Button
                    loading={loadingFollow}
                    onPress={onFollowHandler}
                    style={styles.follow}
                >
                    Ikuti
                </Button>
          
          )}
            {isFollowed && (
                <Button
                    onPress={onFollowHandler}
                    loading={loadingFollow}
                    style={styles.unFollow}
                    textStyle={{
                        color: '#262D33',
                    }}
                    noShadow
                >
                    Mengikuti
                </Button>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    follow: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.main_color,
        paddingBottom: 9,
        paddingTop: 9,
    },
    unFollow: {
        backgroundColor: '#EEFFF5',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.main_color,
        paddingBottom: 9,
        paddingTop: 9,
    },
})
