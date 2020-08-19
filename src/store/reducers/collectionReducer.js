const initState = {
    collectionForEdit: null,
    collectionsFound: []
};

const collectionReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_COLLECTION":
            return {
                ...state,
            }
        case "DELETE_COLLECTION":
            return {
                ...state,
            }
        case "ASSIGN_MOVIE_TO_COLLECTION":
            return {
                ...state,
                collectionForEdit: action.collection,
            }
        case "SELECT_COLLECTION_FOR_EDIT":
            return {
                ...state,
                collectionForEdit: action.collection
            }
        case "REMOVE_MOVIE_FROM_COLLECTION":
            return {
                ...state,
                collectionForEdit: action.collection
            }
        case "MOVE_MOVIE_UP":
            return {
                ...state,
                collectionForEdit: action.collection
            }
        case "MOVE_MOVIE_DOWN":
            return {
                ...state,
                collectionForEdit: action.collection
            }
        case "COLLECTIONS_FOUND":
            return {
                ...state,
                collectionsFound: action.collectionsFound,
                searchError: null
            }
        case "COLLECTION_SEARCH_ERROR":
            return {
                ...state,
                collectionsFound: [],
                searchError: action.searchError
            }
        case "CLEAR_FOUND_COLLECTIONS":
            return {
                ...state,
                collectionsFound: [],
                searchError: null
            }
        case "TOGGLE_COLLECTION_PRIVACY":
            return {
                ...state,
                collectionForEdit: action.collection
            }
        default:
            return state
    }
}

export default collectionReducer;