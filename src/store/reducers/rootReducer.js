import authReducer from './authReducer';
import collectionReducer from './collectionReducer';
import movieReducer from './movieReducer';
import commentReducer from './commentReducer';
import ratingReducer from './ratingReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    auth: authReducer,
    collection: collectionReducer,
    movie: movieReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    comment: commentReducer,
    rating: ratingReducer
})

export default rootReducer;