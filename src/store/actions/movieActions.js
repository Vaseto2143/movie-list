export const getMovieFromOMDb = (movieTitle) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        let nameForURI = movieTitle;
        fetch(
            "http://www.omdbapi.com/?t=" + encodeURIComponent(nameForURI).replace(/%20/g, '+') + "&apikey=b33d51f7"
        ).then(res =>
            res.json()
        ).then((data) => {
            if (data['Response'] == 'False') {
                dispatch({ type: "OMDB_MOVIE_NOT_FOUND" })
            } else {
                dispatch({ type: "OMDB_MOVIE_FOUND", data })
            }
        }).catch((err) => {
            dispatch({ type: "OMDB_MOVIE_SEARCH_ERROR", err })
        })
    }
}

export const getMovie = (movieTitle) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('movies').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if(doc.data().movieTitle == movieTitle){
                    
                }
            })
        })
    }
}

export const likeMovie = (movie) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        const movieTitle = movie['Title'];
        if (!user.likedMovies.hasOwnProperty(movieTitle)) {
            const newMovies = user.likedMovies;
            newMovies[movieTitle] = movie;
            firestore.collection('users').doc(uid).update({
                likedMovies: newMovies
            })
        }
        dispatch({type: "LIKE_MOVIE"})
    }
}

export const unlikeMovie = (movie) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        const movieTitle = movie['Title'];
        if (user.likedMovies.hasOwnProperty(movieTitle)) {
            let newMovies = user.likedMovies;
            delete newMovies[movieTitle];
            firestore.collection('users').doc(uid).update({
                likedMovies: newMovies
            })
        }
        dispatch({type: "UNLIKE_MOVIE"})
    }
}

export const rateMovie = () => {
    return (dispatch, getState) => {
        dispatch({type: "CLEAR_FOUND_MOVIE"})
    }
}

export const commentOnMovie = () => {
    return (dispatch, getState) => {
        dispatch({type: "CLEAR_FOUND_MOVIE"})
    }
}

export const clearFoundMovie = () => {
    return (dispatch, getState) => {
        dispatch({type: "CLEAR_FOUND_MOVIE"})
    }
}

export const addMovieToClipboard = (movie) => {
    return (dispatch, getState) => {
        dispatch({type: "ADD_MOVIE_TO_CLIPBOARD", movie})
    }
}

export const clearMovieClipboard = () => {
    return (dispatch, getState) => {
        dispatch({type: "CLEAR_MOVIE_CLIPBOARD"})
    }
}