import {ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {colors} from "@/constants/colors";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";

const Index = () => {
    const router = useRouter()
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch<any>(fetchMovies)

    const renderBody = () => {
        if (moviesLoading) {
            return (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={styles.activityIndicator}
                />
            )
        }

        if (moviesError) {
            return (
                <Text>Error: {moviesError.message}</Text>
            )
        }

        return (
            <View style={styles.searchContainer}>
                <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder="Search for a movie"
                />

                <>
                    <Text style={styles.searchText}>Latest Movies</Text>

                    <FlatList data={movies} renderItem={({item}) => (
                        <Text key={item.id} style={{color: '#ffffff'}}>{item.title}</Text>
                    )}/>
                </>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image source={images.bg} style={styles.topBg}/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
                        contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>
                <Image source={icons.logo} style={styles.logo}/>

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
    topBg: {
        position: 'absolute',
        width: '100%',
        zIndex: 0,
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
        marginBottom: 12
    }
})
