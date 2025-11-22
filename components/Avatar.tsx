import { colors } from '@/constants/colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface AvatarProps {
    name?: string
}

const Avatar = ({ name }: AvatarProps) => {
    const getInitials = (name?: string): string => {
        if (!name || name.trim() === '') {
            return '??'
        }

        const words = name.trim().split(/\s+/)
        
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase()
        }
        
        return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{getInitials(name)}</Text>
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.light[100],
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.dark[100],
        fontSize: 18,
        fontWeight: 'bold',
    }
})