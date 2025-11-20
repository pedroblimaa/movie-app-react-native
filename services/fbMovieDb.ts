import firebaseConfig from "@/configs/firebaseConfig"
import { urls } from "@/constants/urls"
import { Movie } from "@/interfaces/Movie"
import { collection, doc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore"


const db = firebaseConfig.db

const fbMovieDb = {

    updateSearchCount: async (searchTerm: string, movie: Movie) => {
        try {
            const q = query(
                collection(db, 'metrics'),
                where('searchTerm', '==', searchTerm)
            )

            const querySnapshot = await getDocs(q)
            const result = firebaseConfig.getQueryResult<any>(querySnapshot)

            if (result.length > 0) {
                const existingMovie = result[0]
                await updateDoc(doc(db, 'metrics', existingMovie.id), {
                    searchCount: existingMovie.searchCount + 1,
                    lastSearched: new Date().toISOString(),
                    searchTerm
                })
            } else {
                const newDocRef = doc(collection(db, 'metrics'))
                await setDoc(newDocRef, {
                    movieId: movie.id,
                    title: movie.title,
                    searchCount: 1,
                    lastSearched: new Date().toISOString(),
                    searchTerm,
                    poster_url: `${urls.imageBaseUrl}${movie.poster_path}`
                })
            }
        } catch (error) {
            console.error('Error updating search count:', error)
            throw error
        }
    },

    getTopSearchedMovies: async () => {
        const docs = query(collection(db, 'metrics'))
        const querySnapshot = await getDocs(docs)
        const result = firebaseConfig.getQueryResult<any>(querySnapshot)

        const sortedResult = result.sort((a, b) => b.searchCount - a.searchCount).slice(0, 10).map(movie => ({ title: movie.title, searchCount: movie.searchCount }))
        console.log('top searched movies:', sortedResult)

        console.log(sortedResult.map(movie => movie.title))

        return sortedResult
    },

    getTrendingMovies: async (): Promise<Partial<Movie>[]> => {
        const docs = query(collection(db, 'metrics'), limit(50), orderBy('searchCount', 'desc'))
        const querySnapshot = await getDocs(docs)
        const result = firebaseConfig.getQueryResult<any>(querySnapshot)

        const titleSet = new Set<string>()
        const movies: Partial<Movie>[] = []

        result.forEach(item => {
            if (item.title && item.title.trim() !== '' && !titleSet.has(item.title)) {
                titleSet.add(item.title)
                movies.push({
                    id: item.movieId,
                    title: item.title,
                    poster_path: item.poster_url
                })
            }
        })

        return movies.slice(0, 5)
    }
}

export default fbMovieDb