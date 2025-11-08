export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}

export const endpoints = {
    discoverMovies: () => `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`,
    searchMovies: (query: string) => `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
}

export const fetchMovies = async (query?: string) => {
    const endpoint = query ? endpoints.searchMovies(query) : endpoints.discoverMovies()

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    })

    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movies', response.statusText)
    }

    console.log('Fetching movies')

    const data = await response.json();
    return data.results
}