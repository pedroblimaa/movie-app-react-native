// Import the functions you need from the SDKs you need
import { Movie } from "@/interfaces/Movie"
import { collection, deleteDoc, doc, DocumentData, getDocs, getFirestore, limit, orderBy, query, QuerySnapshot, setDoc, updateDoc, where } from "@firebase/firestore"
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.EXPO_FIREBASE_API_KEY,
    authDomain: "movie-app-341b0.firebaseapp.com",
    projectId: "movie-app-341b0",
    storageBucket: "movie-app-341b0.firebasestorage.app",
    messagingSenderId: "667915745333",
    appId: "1:667915745333:web:445f7de9942878e161997c",
    measurementId: "G-LCTB7ELW7M"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
    try {
        const q = query(
            collection(db, 'metrics'),
            where('searchTerm', '==', searchTerm)
        )

        const querySnapshot = await getDocs(q)
        const result = getQueryResult<any>(querySnapshot)

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
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch (error) {
        console.error('Error updating search count:', error)
        throw error
    }
}

export const getTopSearchedMovies = async () => {
    const docs = query(collection(db, 'metrics'))
    const querySnapshot = await getDocs(docs)
    const result = getQueryResult<any>(querySnapshot)

    const sortedResult = result.sort((a, b) => b.searchCount - a.searchCount).slice(0, 10).map(movie => ({ title: movie.title, searchCount: movie.searchCount }))
    console.log('top searched movies:', sortedResult)

    console.log(sortedResult.map(movie => movie.title))

    return sortedResult
}

export const getTrendingMovies = async (): Promise<Partial<Movie>[]> => {
    const docs = query(collection(db, 'metrics'), limit(50), orderBy('searchCount', 'desc'))
    const querySnapshot = await getDocs(docs)
    const result = getQueryResult<any>(querySnapshot)

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

export const deleteRowsWithoutTitle = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'metrics'))
        const docsToDelete: string[] = []

        querySnapshot.forEach((document) => {
            const data = document.data()
            if (!data.title || data.title.trim() === '' || !data.poster_path) {
                docsToDelete.push(document.id)
            }
        })

        await Promise.all(
            docsToDelete.map(docId => deleteDoc(doc(db, 'metrics', docId)))
        )

        console.log(`Deleted ${docsToDelete.length} documents without title`)
        return { deletedCount: docsToDelete.length, deletedIds: docsToDelete }
    } catch (error) {
        console.error('Error deleting documents without title:', error)
        throw error
    }
}


const getQueryResult = <T>(querySnapshot: QuerySnapshot<DocumentData, DocumentData>): T[] => {
    const result: any[] = []

    querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
    })

    return result
}

