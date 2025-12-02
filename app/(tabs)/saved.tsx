import LoadingIndicator from '@/components/LoadingIndicator'
import SimpleMovieCard from '@/components/SimpleMovieCard'
import { colors } from '@/constants/colors'
import fbMovieDbService from '@/services/fbMovieDbService'
import useFbAuth from '@/services/useFbAuth'
import useFetch from '@/services/useFetch'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const Saved = () => {
    const { user, loading: userLoading } = useFbAuth()
    const {
        data: movies,
        loading: moviesLoading,
        refetch: loadSavedMovies
    } = useFetch(() => fbMovieDbService.getUserSavedMovies(user?.uid), false)

    useFocusEffect(
        useCallback(() => {
            if (user?.uid) {
                loadSavedMovies()
            }
        }, [user?.uid, loadSavedMovies])
    )

    const renderMovies = () => {
        return movies?.length ? (
            <FlatList
                data={movies}
                renderItem={({ item }) => <SimpleMovieCard movie={item} />}
                keyExtractor={item => (item.id ?? item.title ?? '').toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 10,
                    marginBottom: 10
                }}
                scrollEnabled={false}
            />
        ) : (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.emptyText}>No saved movies yet</Text>
            </View>
        )
    }

    return <View style={styles.container}>{userLoading || moviesLoading ? <LoadingIndicator /> : renderMovies()}</View>
}
export default Saved
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        paddingHorizontal: 10
    },
    emptyText: {
        color: colors.light[200],
        fontSize: 16,
        marginTop: 12,
        fontStyle: 'italic'
    }
})
