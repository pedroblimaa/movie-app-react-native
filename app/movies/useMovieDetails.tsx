import fbMovieDbService from '@/services/fbMovieDbService'
import tmdbApiService from '@/services/tmdbApiService'
import useFbAuth from '@/services/useFbAuth'
import useFetch from '@/services/useFetch'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Alert, Animated } from 'react-native'

const useMovieDetails = () => {
    const [savedLoading, setSavedLoading] = useState<boolean>(true)
    const [isMovieSaved, setIsMovieSaved] = useState<boolean>(false)
    const { id } = useLocalSearchParams()
    const { user } = useFbAuth()
    const { data: movie, loading } = useFetch(() => tmdbApiService.fetchMovieDetails(Number(id)))
    const { data: movieSavedData, refetch: getIsMovieSaved } = useFetch(
        () => fbMovieDbService.checkMovieIsSaved(movie?.id, user?.uid),
        false
    )

    useFocusEffect(
        useCallback(() => {
            if (user?.uid) {
                getIsMovieSaved()
            }
        }, [user?.uid, getIsMovieSaved])
    )

    useEffect(() => {
        if (typeof movieSavedData === 'boolean') {
            setIsMovieSaved(!!movieSavedData)
            setSavedLoading(false)
        }
    }, [movieSavedData])

    const scaleAnim = new Animated.Value(1)

    const handleBookmarkPress = async () => {
        Animated.sequence([
            Animated.spring(scaleAnim, { toValue: 1.3, speed: 150, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true })
        ]).start()

        setIsMovieSaved(!isMovieSaved)
        await handleSaveMovie(!isMovieSaved)
        getIsMovieSaved()
    }

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

    return { movie, loading, savedLoading, scaleAnim, handleBookmarkPress, isMovieSaved }
}

export default useMovieDetails
