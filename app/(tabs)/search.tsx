import BackgroundImage from "@/components/BackgroundImage"
import MovieCard from "@/components/MovieCard"
import SearchBar from "@/components/SearchBar"
import { colors } from "@/constants/colors"
import { icons } from "@/constants/icons"
import fbMovieDbService from "@/services/fbMovieDbService"
import tmdbApiService from "@/services/tmdbApiService"
import useFetch from "@/services/useFetch"
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset
    } = useFetch<any>(() => tmdbApiService.fetchMovies(searchQuery), false)
    fbMovieDbService.getTopSearchedMovies()

    useEffect(() => {
        if (movies?.length > 0) {
            fbMovieDbService.updateSearchCount(searchQuery, movies.find((movie: any) => !!movie.title))
        }


        const loadTimeoutFunction = setTimeout(async () => {
            if (searchQuery.trim()) {
                loadMovies()
            } else {
                reset()
            }

        }, 500)

        return () => clearTimeout(loadTimeoutFunction)
    }, [searchQuery, loadMovies, movies, reset ])

    return (
        <View style={styles.container}>
            <BackgroundImage />
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard movie={item} />}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatList}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View style={styles.listHeader}>
                            <Image source={icons.logo} style={{ width: 48, height: 40 }} />
                        </View>

                        <View style={{ marginVertical: 5 }}>
                            <SearchBar
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>

                        {loading && (
                            <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 3 }} />
                        )}

                        {error && (
                            <Text style={styles.errorMsg}>
                                Error: {error}
                            </Text>
                        )}

                        {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                            <Text style={styles.resultMsg}>
                                Search results for {' '}
                                <Text style={{ color: colors.accent }}>{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                            <Text style={{ textAlign: 'center', color: 'gray' }}>
                                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
}
export default Search
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    flatList: {
        paddingHorizontal: 20
    },
    listHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 80,
        alignItems: 'center',
    },
    errorMsg: {
        color: 'red',
        paddingHorizontal: 20,
        marginVertical: 12
    },
    resultMsg: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    }
})
