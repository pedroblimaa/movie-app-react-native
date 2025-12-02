import fbMovieDbService from '@/services/fbMovieDbService'
import tmdbApiService from '@/services/tmdbApiService'
import useFbAuth from '@/services/useFbAuth'
import useFetch from '@/services/useFetch'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Alert, Animated } from 'react-native'

const useMovieDetails = () => {
    const [isMovieSaved, setIsMovieSaved] = useState<boolean>(false)
    const { id } = useLocalSearchParams()
    const { user } = useFbAuth()
    const { data: movie, loading } = useFetch(() => tmdbApiService.fetchMovieDetails(Number(id)))
    const { data: movieSavedData, refetch: getIsMovieSaved, loading: movieSavedLoading } = useFetch(
        () => fbMovieDbService.checkMovieIsSaved(movie?.id, user?.uid),
        false
    )

    useFocusEffect(
        useCallback(() => {
            if (user?.uid) {
                getIsMovieSaved()
            }
        }, [user])
    )

    useEffect(() => {
        if (movieSavedData !== undefined) {
            setIsMovieSaved(!!movieSavedData)
        }
    }, [movieSavedData])

    const scaleAnim = new Animated.Value(1)

    const handleBookmarkPress = async () => {
        Animated.sequence([
            Animated.spring(scaleAnim, { toValue: 1.3, speed: 150, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true })
        ]).start()

        await handleSaveMovie(!isMovieSaved)
        setIsMovieSaved(!isMovieSaved)
        getIsMovieSaved()
    }

    // TODO: Improve logic so that feedback ins instant when saving/unsaving movie
    const handleSaveMovie = async (save = true) => {
        if (!user) {
            return Alert.alert('You need to sign in', 'Log in to save movies to your account.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign in', onPress: () => router.push('/profile') }
            ])
        }

        if (save) {
            await fbMovieDbService.saveUserMovie(movie, user.uid)
        } else {
            await fbMovieDbService.removeUserMovie(movie, user.uid)
        }
    }

    return { movie, loading: loading || movieSavedLoading, scaleAnim, handleBookmarkPress, isMovieSaved }
}

export default useMovieDetails
