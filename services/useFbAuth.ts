import firebaseConfig from "@/configs/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth"
import { useEffect, useState } from "react"

const errorMaps = {
    'email-already-in-use': 'This email is already in use.',
}

const useFbAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = firebaseConfig.auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const executeWithLoading = async (authFunction: () => Promise<UserCredential | void>) => {
        try {
            setLoading(true)
            setError(null)
            const userCredential = await authFunction()
            setUser(userCredential?.user || null)
        } catch (error) {
            if (!(error instanceof Error)) {
                setError('An unknown error occurred')
                return
            }

            const customMessage = errorMaps && Object.keys(errorMaps).find(key => (error as any).message.includes(key))
            const errorMessage = customMessage
                ? errorMaps[customMessage as keyof typeof errorMaps]
                : 'An error occurred during authentication.'

            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const register = async (email: string, password: string) => {
        executeWithLoading(() => createUserWithEmailAndPassword(firebaseConfig.auth, email, password))
    }

    const login = async (email: string, password: string) => {
        executeWithLoading(() => signInWithEmailAndPassword(firebaseConfig.auth, email, password))
    }

    const logout = async () => {
        executeWithLoading(() => firebaseConfig.auth.signOut())
    }

    return { user, register, login, logout, loading, error }
}

export default useFbAuth