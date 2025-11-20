import firebaseConfig from "@/configs/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth"
import { useEffect, useState } from "react"

const useFbAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = firebaseConfig.auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false) // Auth state is now known
        })

        return () => unsubscribe() // Cleanup on unmount
    }, [])

    const executeWithLoading = async (authFunction: () => Promise<UserCredential | void>) => {
        try {
            setLoading(true)
            const userCredential = await authFunction()
            setUser(userCredential?.user || null)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred')
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