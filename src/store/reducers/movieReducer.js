const initState = {
    movieForInteraction: null,
    foundOMDbMovie: null
};

const movieReducer = (state = initState, action) => {
    switch (action.type) {
        case "OMDB_MOVIE_SEARCH_ERROR":
            return {
                ...state,
                searchError: action.err.message,
                foundOMDbMovie: null
            }
        case "OMDB_MOVIE_NOT_FOUND":
            return {
                ...state,
                searchError: "Movie not found",
                foundOMDbMovie: null
            }
        case "OMDB_MOVIE_FOUND":
            return {
                ...state,
                searchError: null,
                foundOMDbMovie: action.data
            }
        case "LIKE_MOVIE":
            return {
                ...state,
            }
        case "UNLIKE_MOVIE":
            return {
                ...state,
            }
        case "CLEAR_FOUND_MOVIE":
            return {
                ...state,
                foundOMDbMovie: null
            }
        case "ADD_MOVIE_TO_CLIPBOARD":
            return {
                ...state,
                movieForInteraction: action.movie
            }
        case "CLEAR_MOVIE_CLIPBOARD":
            return {
                ...state,
                movieForInteraction: null
            }
        default:
            return state
    }
}

export default movieReducer;