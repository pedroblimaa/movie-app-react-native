import { colors } from '@/constants/colors'
import React from 'react'
import { Text, View } from 'react-native'


interface MovieInfoProps {
    label: string
    value?: string | number | null
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
    return (

        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: colors.light[200] }}>{label}</Text>
            <Text style={{ color: colors.light[100], fontWeight: 'bold', marginTop: 8, fontSize: 12 }}>{value || 'N/A'}</Text>
        </View>
    )
}

export default MovieInfo
