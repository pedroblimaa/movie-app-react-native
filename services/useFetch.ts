import {useCallback, useEffect, useState} from "react";

interface UseFetch<T> {
    data: T | null,
    loading: boolean,
    error: Error | null,
    refetch: () => void,
    reset: () => void,
}

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true): UseFetch<T> => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const reset = useCallback(() => {
        setData(null)
        setLoading(false)
        setError(null)
    }, [])

    const fetchData = useCallback(async() => {
        try {
           reset()
            const result = await fetchFunction()
            setData(result)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'))
        } finally {
            setLoading(false )
        }
    }, [fetchFunction, reset])

    useEffect(() => {
        if(autoFetch) {
            fetchData()
        }
    }, [autoFetch, fetchData]);

    return { data, loading, error, refetch: fetchData, reset }
}

export default useFetch