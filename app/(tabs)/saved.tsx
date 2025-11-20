import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Saved = () => {
    return (
        <View style={styles.container}>
            <Image source={icons.save} style={{ width: 40, height: 40 }} tintColor='#fff' />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Profile</Text>
        </View>
    )
}
export default Saved
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
    }
})
