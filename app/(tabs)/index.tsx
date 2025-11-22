import BackgroundImage from "@/components/BackgroundImage"
import LoadingIndicator from "@/components/LoadingIndicator"
import MovieCard from "@/components/MovieCard"
import SearchBar from "@/components/SearchBar"
import TrendingCard from "@/components/TrendingCard"
import { colors } from "@/constants/colors"
import { icons } from "@/constants/icons"
import fbMovieDbService from "@/services/fbMovieDbService"
import tmdbApiService from "@/services/tmdbApiService"
import useFetch from "@/services/useFetch"
import { useRouter } from "expo-router"
import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

const Index = () => {
    const router = useRouter()

    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError
    } = useFetch<any>(fbMovieDbService.getTrendingMovies)

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch<any>(() => tmdbApiService.fetchMovies(''))

    const renderBody = () => {
        if (moviesLoading || trendingLoading) {
            return (
                <View style={{ marginTop: 40 }}>
                    <LoadingIndicator />
                </View>
            )
        }

        if (moviesError || trendingError) {
            return (
                <Text>Error: {moviesError || trendingError}</Text>
            )
        }

        return (
            <View style={styles.searchContainer}>
                <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder="Search for a movie"
                />

                {trendingMovies && trendingMovies.length > 0 && (
                    <>
                        <Text style={styles.searchText}>Trending Movies</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                            style={{ marginBottom: 16, marginTop: 12 }}
                            data={trendingMovies}
                            renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                            keyExtractor={(_, index) => index.toString()}
                        />
                    </>
                )}

                <Text style={styles.searchText}>Latest Movies</Text>

                <FlatList
                    data={movies}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: 'flex-start',
                        gap: 20,
                        paddingRight: 10,
                        marginBottom: 10
                    }}
                    style={styles.flatList}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <BackgroundImage />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
                <Image source={icons.logo} style={styles.logo} />

                {renderBody()}
            </ScrollView>
        </View>
    )
}
export default Index
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    scrollView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    logo: {
        width: 60,
        height: 50,
        marginTop: 100,
        marginBottom: 25,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    searchContainer: {
        flex: 1,
        marginTop: 5,
    },
    activityIndicator: {
        marginTop: 40,
        alignSelf: 'center',
    },
    searchText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.light["100"],
        marginBottom: 12,
        marginTop: 12
    },
    flatList: {
        paddingBottom: 128
    }
})
