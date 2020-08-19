export const signIn = (credentials) => {
    return (dispatch, state, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: "LOGIN_SUCCESS" });
        }).catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err });
        })
    }
}

export const signUp = (credentials) => {
    return (dispatch, state, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                likedMovies: {},
                collections: {},
                comments: {},
                ratings: {}
            });
        }).then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" });
        }).catch(err => {
            dispatch({ type: "SIGNUP_ERROR", err });
        })
    }
}

export const signOut = () => {
    return (dispatch, state, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut(
        ).then(() => {
            dispatch({ type: "SIGNOUT_SUCCESS" });
        });
    }
}

export const resetPassword = (email) => {
    return (dispatch, state, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            dispatch({ type: "EMAIL_SENT" });
        }).catch(err => {
            dispatch({ type: "RESET_ERROR", err });
        });
    }
}

export const clearAuthError = () => {
    return (dispatch, state, { getFirebase }) => {
        dispatch({ type: "CLEAR_ERROR" });
    }
}