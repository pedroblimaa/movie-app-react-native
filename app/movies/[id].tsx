import LoadingIndicator from '@/components/LoadingIndicator'
import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import { urls } from '@/constants/urls'
import { IMovieDetails } from '@/interfaces/Movie'
import tmdbApi from '@/services/tmdbApi'
import useFetch from '@/services/useFetch'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface MovieInfoProps {
    label: string
    value?: string | number | null
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }}>
        <Text style={{ color: colors.light[200] }}>{label}</Text>
        <Text style={{ color: colors.light[100], fontWeight: 'bold', marginTop: 8, fontSize: 12 }}>{value || 'N/A'}</Text>
    </View>
)


const MovieDetails = () => {
    const { id } = useLocalSearchParams()
    const { data: movie, loading } = useFetch<IMovieDetails>(() => tmdbApi.fetchMovieDetails(Number(id)))

    const getContent = () => {
        if (loading) {
            return (
                <LoadingIndicator />
            )
        }

        return (
            <>
                <View>
                    <Image source={{ uri: `${urls.imageBaseUrl}${movie?.poster_path}` }} style={{ width: '100%', height: 450 }} resizeMode='cover' />
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
                    <MovieInfo label='Genres' value={movie?.genres?.map(g => g.name).join(' - ') || 'N/A'} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
                        <MovieInfo label='Budget' value={movie?.budget ? `$${(movie.budget / 1000000).toLocaleString()} million` : 'N/A'} />
                        <MovieInfo label='Revenue' value={movie?.revenue ? `$${(movie.revenue / 1000000).toLocaleString()} million` : 'N/A'} />
                    </View>

                    <MovieInfo label='Production Companies' value={movie?.production_companies?.map(pc => pc.name).join(' - ') || 'N/A'} />
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    textView: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 20,
        paddingHorizontal: 20
    },
    header: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        color: colors.light["200"],
        fontSize: 14,
    },
    backButton: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        marginHorizontal: 5,
        backgroundColor: colors.accent,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: '100%',
    }
})
