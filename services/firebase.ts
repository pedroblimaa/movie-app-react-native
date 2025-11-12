// Import the functions you need from the SDKs you need
import { Movie } from "@/interfaces/Movie"
import { collection, doc, DocumentData, getDocs, getFirestore, query, QuerySnapshot, setDoc, updateDoc, where } from "@firebase/firestore"
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbDBtAkRlC73i-RaFNy0IdhpqREQqhUVc",
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

    const sortedResult = result.sort((a, b) => b.searchCount - a.searchCount).slice(0, 10).map(movie => ({title: movie.title, searchCount: movie.searchCount}))
    console.log('top searched movies:', sortedResult)

    return sortedResult
}

const getQueryResult = <T>(querySnapshot: QuerySnapshot<DocumentData, DocumentData>): T[] => {
    const result: any[] = []

    querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
    })

    return result
}
