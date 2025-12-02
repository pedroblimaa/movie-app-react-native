import LoadingIndicator from '@/components/LoadingIndicator'
import MovieInfo from '@/components/MovieInfo'
import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import { urls } from '@/constants/urls'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './MovieDetails.styles'
import useMovieDetails from './useMovieDetails'

const MovieDetails = () => {
    const {
        movie,
        loading,
        savedLoading,
        scaleAnim,
        handleBookmarkPress,
        isMovieSaved
    } = useMovieDetails()



    const saveButton = () => {
        return (
            <TouchableOpacity style={styles.saveIconContainer} onPress={handleBookmarkPress}>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Ionicons
                        name={isMovieSaved ? 'bookmark' : 'bookmark-outline'}
                        size={20}
                        color={colors.accent}
                    />
                </Animated.View>
            </TouchableOpacity>
        )
    }

    const getContent = () => {
        if (loading || savedLoading ) {
            return (
                <View style={{ marginTop: 40 }}>
                    <LoadingIndicator />
                </View>
            )
        }

        return (
            <>
                <View>
                    <Image source={{ uri: `${urls.imageBaseUrl}${movie?.poster_path}` }} style={{ width: '100%', height: 450 }} resizeMode='cover' />
                    {saveButton()}
                </View>

                <View style={styles.textView}>
                    <Text style={styles.header}>{movie?.title}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
                        <Text style={styles.text}>{movie?.release_date?.split('-')?.[0]}</Text>
                        <Text style={styles.text}>{movie?.runtime}m</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.dark[100], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginTop: 8, gap: 4 }}>
                        <Image source={icons.star} style={{ width: 16, height: 16 }} />
                        <Text style={[styles.text, { color: 'white', fontWeight: 'bold' }]}>{((movie?.vote_average || 0) / 2).toFixed(1)} / 5</Text>
                        <Text style={[styles.text]}>({movie?.vote_count} votes)</Text>
                    </View>

                    <MovieInfo label='Overview' value={movie?.overview} />
                    <MovieInfo label='Genres' value={movie?.genres?.map((g: any) => g.name).join(' - ') || 'N/A'} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
                        <MovieInfo label='Budget' value={movie?.budget ? `$${(movie.budget / 1000000).toLocaleString()} million` : 'N/A'} />
                        <MovieInfo label='Revenue' value={movie?.revenue ? `$${(movie.revenue / 1000000).toLocaleString()} million` : 'N/A'} />
                    </View>

                    <MovieInfo label='Production Companies' value={movie?.production_companies?.map((pc: any) => pc.name).join(' - ') || 'N/A'} />
                </View>

            </>
        )
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

                {getContent()}

            </ScrollView>

            <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }}>
                <Image source={icons.arrow} style={{ width: 20, height: 20, marginRight: 4, transform: [{ rotate: '180deg' }] }} tintColor='#fff' />
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MovieDetails