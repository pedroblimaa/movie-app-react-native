import { useCallback, useEffect, useState } from "react"

interface UseFetch<T> {
    data: T | null,
    loading: boolean,
    error: string | null,
    refetch: () => void,
    reset: () => void,
}

const handleError = (err: Error, setError: (error: string) => void, errorMaps?: Record<string, string>) => {
    if (!(err instanceof Error)) {
        setError('An unknown error occurred')
        return
    }

    const errorMessage = err.message
    const customMessage = errorMaps && Object.keys(errorMaps).find(key => errorMessage.includes(key))
    const finalMessage = customMessage
        ? errorMaps[customMessage as keyof typeof errorMaps]
        : err.message

    setError(finalMessage)
}

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true, errorMaps?: Record<string, string>): UseFetch<T> => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const reset = useCallback(() => {
        setData(null)
        setLoading(false)
        setError(null)
    }, [])

    const fetchData = useCallback(async () => {
        try {
            reset()
            setLoading(true)
            const result = await fetchFunction()
            setData(result)
        } catch (err) {
            handleError(err as Error, setError, errorMaps)
        } finally {
            setLoading(false)
        }
    }, [fetchFunction, reset, errorMaps])

    useEffect(() => {
        if (autoFetch) {
            fetchData()
        }
    }, [autoFetch, fetchData])

    return { data, loading, error, refetch: fetchData, reset }
}

export default useFetch