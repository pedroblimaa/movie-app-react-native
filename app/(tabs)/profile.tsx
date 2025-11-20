import Auth from '@/components/Auth'
import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Profile = () => {
    return (
        <View style={styles.container}>

            <Image source={icons.person} style={{ width: 40, height: 40 }} tintColor='#fff' />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Profile</Text>

            <Auth />
        </View>
    )
}
export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 5,
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
    }
})
