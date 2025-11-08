// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import {Movie} from "@/interfaces/Movie"
import {collection, getDocs, getFirestore} from "@firebase/firestore"
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
    const querySnapshot = await getDocs(collection(db, 'metrics'))
    const result: any[] = [];

    querySnapshot.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()});
    });

    console.log(result);
}