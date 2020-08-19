import React, { Component } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { assignMovieToCollection, selectCollectionForEdit, deleteCollection, toggleCollectionPrivacy } from '../../store/actions/collectionActions';

class PersonalCollections extends Component {
    state = {
        collections: this.props.collections
    }

    handleAssign = (collection, movie, userId) => (e) => {
        this.props.assignMovieToCollection([collection[0], {authorId: userId, movies: collection[1].movies, privacy: collection[1].privacy}], movie);
    }

    handleDelete = (collection) => (e) => {
        this.props.deleteCollection(collection);
    }

    handleEdit = (collection, userId) => (e) => {
        collection[1].userId = userId
        this.props.selectCollectionForEdit([collection[0], {authorId: userId, movies: collection[1].movies, privacy: collection[1].privacy}]);
    }

    handlePrivacyChange = (collection) => (e) => {
        this.props.toggleCollectionPrivacy(collection)
    }

    render() {
        const { auth, movieForCollection, collections } = this.props;
        if (!auth.uid) {
            return <Redirect to='/signin' />
        }
        else {
            const collectionList = Object.entries(collections).map(collection => {
                const movieCount = Object.values(collection[1].movies).length;
                return (
                    <Card style={{ marginTop: '20px' }} key={collection[0]}>
                        <Card.Header style={{ fontSize: '20px' }}>{collection[0]}</Card.Header>
                        <Card.Body>
                            {movieCount} movies in collection
                        </Card.Body>
                        <Card.Footer>
                            <Button style={{ marginLeft: "10px" }} className="float-right" variant="outline-danger" onClick={this.handleDelete(collection)}>Delete</Button>
                            {collection[1].privacy == "Private" ?
                                <Button onClick={this.handlePrivacyChange(collection)} variant="outline-danger" className="float-right">{collection[1].privacy}</Button>
                                :
                                <Button onClick={this.handlePrivacyChange(collection)} variant="outline-success" className="float-right">{collection[1].privacy}</Button>}
                            {movieForCollection ?
                                <Link to="/collectionDetails" className="btn btn-outline-success" onClick={this.handleAssign(collection, movieForCollection, auth.uid)}>Assign to collection</Link>
                                :
                                <Link to="/collectionDetails" className="btn btn-outline-secondary" onClick={this.handleEdit(collection, auth.uid)}>Edit</Link>
                            }
                        </Card.Footer>
                    </Card>
                )
            })
            return (
                <Container>
                    <Card>
                        <Card.Header style={{ fontSize: '30px' }}>My Collections</Card.Header>
                        <Card.Body>
                            <Link to="/createCollection" className="btn btn-outline-success">Create collection</Link>
                            {collectionList}
                        </Card.Body>
                        {collectionList.length > 0 ?
                            null
                            : <Card.Footer>You don't have any collections.</Card.Footer>}
                    </Card>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        collections: state.firebase.profile.collections,
        auth: state.firebase.auth,
        movieForCollection: state.movie.movieForInteraction
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        assignMovieToCollection: (collection, movie) => dispatch(assignMovieToCollection(collection, movie)),
        selectCollectionForEdit: (collection) => dispatch(selectCollectionForEdit(collection)),
        deleteCollection: (collection) => dispatch(deleteCollection(collection)),
        toggleCollectionPrivacy: (collection) => dispatch(toggleCollectionPrivacy(collection))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCollections);