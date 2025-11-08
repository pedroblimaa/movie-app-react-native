import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Movie} from "@/interfaces/Movie";
import {Link} from "expo-router";
import {icons} from "@/constants/icons";
import {colors} from "@/constants/colors";

interface MovieCardProps {
    movie: Movie
}

const TMDB_IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'
const PLACEHOLDER_PATH = ' https://placeholder.co/600x400/1a1a1a/ffffff.png'

const MovieCard = ({movie}: MovieCardProps) => {
    const imgUrl = movie.poster_path ? `${TMDB_IMAGE_PATH}${movie.poster_path}` : PLACEHOLDER_PATH

    return (
        <Link href={`/movies/${movie.id}`} asChild>
            <TouchableOpacity style={{width: '30%'}}>
                <Image src={imgUrl} style={styles.image}/>
                <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
                <View style={styles.subtitleContainer}>
                    <View style={styles.starContainer}>
                        <Image source={icons.star} style={styles.star}/>
                        <Text style={styles.starText}>{Math.round(movie.vote_average / 2)}</Text>
                    </View>
                    <View style={styles.releaseDateContainer}>
                        <Text style={styles.releaseDateText}> {movie.release_date?.split('-')[0]}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}
export default MovieCard
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
        fontWeight: 'bold',
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 4
    },
    star: {
        width: 16,
        height: 16,
    },
    starText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    releaseDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    releaseDateText: {
        fontSize: 12,
        color: colors.light["300"],
        fontWeight: 'medium',
        marginTop: 1
    }
})
