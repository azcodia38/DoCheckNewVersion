import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'

import Images from 'src/assets'

const EmptyComponent = (props: any) => {
    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: -windowHeight * 0.2,
            }}
        >
            <Image
                style={{
                    height: windowHeight * 0.3,
                    width: windowWidth * 0.8,
                    resizeMode: 'contain',
                }}
                source={Images.noReferralIcon}
            />
            <Text
                style={{
                    color: '#444145',
                    fontSize: 23,
                    fontWeight: '700',
                    marginTop: 10,
                }}
            >
                Whoops!
            </Text>
            {props.title == 'Pengikut' ? (
                <Text style={{ color: '#CCC', marginTop: 10 }}>
                    Kamu belum punya pengikut nih..
                </Text>
            ) : (
                <Text style={{ color: '#CCC', marginTop: 10 }}>
                    Kamu belum punya yang mengikuti nih..
                </Text>
            )}
        </View>
    )
}

export default EmptyComponent

const styles = StyleSheet.create({})
