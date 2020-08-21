/* export const rateCollection = (collection, rating) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const user = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        const newCollections = user.collections;



        let collectionCopy = collection;
        let collectionId = '';
        firestore.collection('collections').where('authorId', '==', collection[1].authorId).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        collectionId = doc.id
                    });
                })
                .then(() => {
                    const ratingForCollection = {userId: uid, rating: rating * 1};
                    let userHasRated = false;
                    collectionCopy[1].ratings.forEach(ratingPair => {
                        if(ratingPair.userId == uid){
                            ratingPair.rating = rating * 1
                            userHasRated = true;
                        }
                    })

                    newCollections[collection[0]].ratings.forEach(ratingPair => {
                        if(ratingPair.collectionId == collectionId){
                            ratingPair.rating = rating * 1
                            userHasRated = true;
                        }
                    })

                    if(!userHasRated){
                        collectionCopy[1].ratings.push(ratingForCollection);
                        newCollections[collection[0]].ratings.push({collectionId: collectionId, rating: rating * 1})
                    }

                    firestore.collection('users').doc(uid).update({
                        collections: newCollections
                    })
                })

        dispatch({ type: "RATE_COLLECTION", collection: collectionCopy })
    }
} */