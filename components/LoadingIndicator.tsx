import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet } from 'react-native'

interface LoadingIndicatorProps {
    size?: ActivityIndicatorProps['size']
}

const LoadingIndicator = ({ size = 'large' }: LoadingIndicatorProps) => {
    return (
        <ActivityIndicator
            size={size}
            color='#AB8Bff'
            style={styles.activityIndicator}
        />
    )
}

export default LoadingIndicator

const styles = StyleSheet.create({
    activityIndicator: {
        alignSelf: 'center',
    },
})