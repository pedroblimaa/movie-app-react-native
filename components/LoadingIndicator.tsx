import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

const LoadingIndicator = () => {
    return (
        <ActivityIndicator
            size="large"
            color='#AB8Bff'
            style={styles.activityIndicator}
        />
    )
}

export default LoadingIndicator

const styles = StyleSheet.create({
    activityIndicator: {
        marginTop: 60,
        alignSelf: 'center',
    },
})