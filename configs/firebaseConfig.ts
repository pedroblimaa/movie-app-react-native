import { DocumentData, getFirestore, QuerySnapshot } from "@firebase/firestore"
import { initializeApp } from "firebase/app"

const config = {
    apiKey: process.env.EXPO_FIREBASE_API_KEY,
    authDomain: "movie-app-341b0.firebaseapp.com",
    projectId: "movie-app-341b0",
    storageBucket: "movie-app-341b0.firebasestorage.app",
    messagingSenderId: "667915745333",
    appId: "1:667915745333:web:445f7de9942878e161997c",
    measurementId: "G-LCTB7ELW7M"
}

// Initialize Firebase
const app = initializeApp(config)


const firebaseConfig = {
    db: getFirestore(app),

    getQueryResult: <T>(querySnapshot: QuerySnapshot<DocumentData, DocumentData>): T[] => {
        const result: any[] = []

        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() })
        })

        return result
    }
}

export default firebaseConfig
