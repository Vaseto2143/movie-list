export const createCollection = (collectionTitle, collectionPrivacy) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        const newCollections = user.collections;
        if (!user.collections.hasOwnProperty(collectionTitle)) {
            newCollections[collectionTitle] = { privacy: collectionPrivacy, movies: [], comments: [], ratings: []};
            firestore.collection('users').doc(uid).update({
                collections: newCollections
            })
            firestore.collection('collections').add({
                title: collectionTitle,
                privacy: collectionPrivacy,
                movies: [],
                authorId: uid,
                authorFirstName: user.firstName,
                authorLastName: user.lastName,
                comments: [],
                ratings: []
            })
        }
        dispatch({ type: "CREATE_COLLECTION", collection: newCollections[collectionTitle] })
    }
}

export const deleteCollection = (collection) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        if (user.collections.hasOwnProperty(collection[0])) {
            const newCollections = user.collections;
            delete newCollections[collection[0]];
            firestore.collection('users').doc(uid).update({
                collections: newCollections
            })
            firestore.collection('collections').where('authorId', '==', uid).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const foundCollectionTitle = doc.data().title;
                        if (collection[0] == foundCollectionTitle) {
                            firestore.collection('collections').doc(doc.id).delete()
                        }
                    });
                })
        }
        dispatch({ type: "DELETE_COLLECTION" })
    }
}

export const assignMovieToCollection = (collection, movie) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        const newCollections = user.collections;
        const movieId = newCollections[collection[0]].movies.length;
        const movieForCollection = { movieTitle: movie['Title'], movieInfo: movie, position: movieId + 1 };
        let movieInList = false;
        user.collections[collection[0]].movies.forEach(movie => {
            if (movie.movieTitle == movieForCollection.movieTitle) {
                movieInList = true;
            }
        })
        if (!movieInList) {
            newCollections[collection[0]].movies[movieId] = movieForCollection;
            collection[1].movies[movieId] = movieForCollection;
            firestore.collection('users').doc(uid).update({
                collections: newCollections
            })
            firestore.collection('collections').where('authorId', '==', uid).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const foundCollectionTitle = doc.data().title;
                        if (collection[0] == foundCollectionTitle) {
                            firestore.collection('collections').doc(doc.id).update({
                                movies: collection[1].movies
                            })
                        }
                    });
                })
            dispatch({ type: "ASSIGN_MOVIE_TO_COLLECTION", collection })
        }
    }
}

export const removeMovieFromCollection = (collection, movie) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;

        const newCollections = user.collections;

        let collectionCopy = collection[1];
        collectionCopy = collectionCopy.movies.filter(movieToStay => movieToStay.position != movie.position)
        collectionCopy = collectionCopy.map(movieToStay => {
            if (movieToStay.position < movie.position) {
                return movieToStay
            }
            else {
                movieToStay.position--;
                return movieToStay
            }
        })

        collection[1].movies = collectionCopy
        newCollections[collection[0]].movies = collection[1].movies;
        firestore.collection('users').doc(uid).update({
            collections: newCollections
        })
        firestore.collection('collections').where('authorId', '==', uid).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const foundCollectionTitle = doc.data().title;
                    if (collection[0] == foundCollectionTitle) {
                        firestore.collection('collections').doc(doc.id).update({
                            movies: collection[1].movies
                        })
                    }
                });
            })
        dispatch({ type: "REMOVE_MOVIE_FROM_COLLECTION", collection })
    }
}

export const moveMovieUp = (collection, movie) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        const newCollections = user.collections;

        if (movie.position > 1) {
            const position = movie.position;
            const newMovies = collection[1].movies;
            const holder = collection[1].movies[position - 2];
            newMovies[position - 2] = newMovies[position - 1];
            newMovies[position - 2].position--;
            newMovies[position - 1] = holder;
            newMovies[position - 1].position++;

            newCollections[collection[0]].movies = newMovies;
            collection[1].movies = newMovies
            firestore.collection('users').doc(uid).update({
                collections: newCollections
            })
            firestore.collection('collections').where('authorId', '==', uid).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const foundCollectionTitle = doc.data().title;
                        if (collection[0] == foundCollectionTitle) {
                            firestore.collection('collections').doc(doc.id).update({
                                movies: collection[1].movies
                            })
                        }
                    });
                })
            dispatch({ type: "MOVE_MOVIE_UP", collection })
        }
    }
}

export const moveMovieDown = (collection, movie) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        const newCollections = user.collections;

        if (movie.position < collection[1].movies.length) {
            const position = movie.position;
            console.log(position)
            const newMovies = collection[1].movies;
            const holder = collection[1].movies[position];
            newMovies[position] = newMovies[position - 1];
            newMovies[position].position++;
            newMovies[position - 1] = holder;
            newMovies[position - 1].position--;

            newCollections[collection[0]].movies = newMovies;
            collection[1].movies = newMovies
            firestore.collection('users').doc(uid).update({
                collections: newCollections
            })
            firestore.collection('collections').where('authorId', '==', uid).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const foundCollectionTitle = doc.data().title;
                        if (collection[0] == foundCollectionTitle) {
                            firestore.collection('collections').doc(doc.id).update({
                                movies: collection[1].movies
                            })
                        }
                    });
                })
        }
        dispatch({ type: "MOVE_MOVIE_DOWN", collection })
    }
}

export const toggleCollectionPrivacy = (collection) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        const newCollections = user.collections;
        if (user.collections[collection[0]].privacy == "Private") {
            newCollections[collection[0]].privacy = "Public";
            collection[1].privacy = "Public";
        }
        else {
            newCollections[collection[0]].privacy = "Private";
            collection[1].privacy = "Private";
        }
        firestore.collection('users').doc(uid).update({
            collections: newCollections
        });
        firestore.collection('collections').where('authorId', '==', uid).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const foundCollectionTitle = doc.data().title;
                    if (collection[0] == foundCollectionTitle) {
                        firestore.collection('collections').doc(doc.id).update({
                            privacy: collection[1].privacy
                        })
                    }
                });
            })
        dispatch({ type: "TOGGLE_COLLECTION_PRIVACY", collection })
    }
}

export const searchCollections = (collectionTitle) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        let collectionsFound = [];
        firestore.collection('collections').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const foundCollectionTitle = doc.data().title;
                    const foundConnectionPrivacy = doc.data().privacy;
                    if (collectionTitle == foundCollectionTitle && foundConnectionPrivacy == "Public") {
                        collectionsFound.push(doc.data());
                    }
                });
            })
            .then(() => {
                dispatch({ type: "COLLECTIONS_FOUND", collectionsFound })
            })
            .catch(err => {
                dispatch({ type: "COLLECTIONS_SEARCH_ERROR", err });
            })
    }
}

export const clearFoundCollections = () => {
    return (dispatch, getState) => {
        dispatch({ type: "CLEAR_FOUND_COLLECTIONS" })
    }
}

export const selectCollectionForEdit = (collection) => {
    return (dispatch, getState) => {
        dispatch({ type: "SELECT_COLLECTION_FOR_EDIT", collection })
    }
}