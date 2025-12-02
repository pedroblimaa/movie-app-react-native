import { urls } from '@/constants/urls'
import { FbSimpleMovie } from '@/interfaces/Movie'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface SimpleMovieCardProps {
    movie: Partial<FbSimpleMovie>
}

const SimpleMovieCard = ({ movie }: SimpleMovieCardProps) => {
    const imgUrl = movie.poster_url ? `${urls.imageBaseUrl}${movie.poster_url}` : urls.placeholderUrl

    return (
        <Link href={`/movies/${movie.id}`} asChild>
            <TouchableOpacity style={{ width: '30%' }}>
                <Image src={imgUrl} style={styles.image} />
                <Text style={styles.title} numberOfLines={1}>
                    {movie.title}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}
export default SimpleMovieCard
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 160,
        borderRadius: 8
    },
    title: {
        fontSize: 10,
        color: 'white',
        marginTop: 8,
        fontWeight: 'bold'
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
