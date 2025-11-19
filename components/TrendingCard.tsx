import { images } from '@/constants/images'
import { Movie } from '@/interfaces/Movie'
import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface TrendingCardProps {
    movie: Movie,
    index: number,
}

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
    return (
        <Link href={`/movies/${movie.id}`} asChild>
            <TouchableOpacity style={{ position: 'relative', paddingLeft: 20 }}>
                <Image source={{ uri: movie.poster_path }} style={{ width: 120, height: 180, borderRadius: 8 }} resizeMode='cover' />
                <View style={{ position: 'absolute', bottom: 24, left: -8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 9999 }}>
                    <MaskedView maskElement={
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>{index + 1}</Text>
                    }>
                        <Image source={images.rankingGradient} style={{ width: 56, height: 56 }} resizeMode='cover' />
                    </MaskedView>
                </View>

                <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 8, width: 120 }} numberOfLines={1}>
                    {movie.title}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard

const styles = StyleSheet.create({})