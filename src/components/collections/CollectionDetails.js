import React, { Component } from 'react';
import { Card, Button, Container, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { removeMovieFromCollection, toggleCollectionPrivacy, moveMovieDown, moveMovieUp, clearCollectionForEdit } from '../../store/actions/collectionActions';
import MovieDetails from '../movies/MovieDetails';
import { addMovieToClipboard, unlikeMovie, likeMovie } from '../../store/actions/movieActions';

class CollectionDetails extends Component {
    state = {
        collection: this.props.collection,
        pageNumber: 1
    }

    handleRemove = (collection, movie) => (e) => {
        this.props.removeMovieFromCollection(collection, movie);
        this.setState({
            ...this.state,
            collection: this.props.collection,
        })
    }

    handlePrivacyChange = (collection) => (e) => {
        this.props.toggleCollectionPrivacy(collection);
        this.setState({
            ...this.state,
            collection: this.props.collection
        })
    }

    handleMoveUp = (collection, movie) => (e) => {
        this.props.moveMovieUp(collection, movie)
        this.setState({
            ...this.state,
            collection: this.props.collection,
        })
    }

    handleMoveDown = (collection, movie) => (e) => {
        this.props.moveMovieDown(collection, movie)
        this.setState({
            ...this.state,
            collection: this.props.collection,
        })
    }

    handleLike = (movie) => (e) => {
        this.props.likeMovie(movie);
    }

    handleUnlike = (movie) => (e) => {
        this.props.unlikeMovie(movie);
    }

    handlePageChange = (redirectTo) => (e) => {
        this.setState({
            ...this.state,
            pageNumber: redirectTo
        })
    }

    render() {
        const { auth, collection, user } = this.props;
        const { pageNumber } = this.state;
        if (!collection) {
            if (!auth.uid) {
                return <Redirect to='/' />
            }
            else {
                return <Redirect to='/collections' />
            }
        }
        else {
            const moviesObject = this.state.collection[1].movies ? this.state.collection[1].movies : {};
            const movies = Object.values(moviesObject);
            const moviesForPage = movies.length >= pageNumber * 2 ? [movies[(pageNumber * 2) - 2], movies[(pageNumber * 2) - 1]] : [movies[(pageNumber * 2) - 2]];
            let movieList = [];
            if (movies.length > 0) {
                movieList = moviesForPage.map(movie => {
                    return (
                        <Card style={{ marginTop: '20px' }}>
                            <MovieDetails key={movie.movieTitle} movie={movie.movieInfo} position={movie.position} />
                            {auth.uid ?
                                collection[1].authorId == auth.uid ?
                                    <Card.Footer>
                                        {movie.position > 1 ?
                                            <Button className="float-left" variant="outline-success" onClick={this.handleMoveUp(collection, movie)}>Move up</Button>
                                            :
                                            <Button className="float-left" variant="outline-secondary" onClick={this.handleMoveUp(collection, movie)}>Move up</Button>}
                                        {movie.position < collection[1].movies.length ?
                                            <Button className="float-left" style={{ marginLeft: "10px" }} variant="outline-danger" onClick={this.handleMoveDown(collection, movie)}>Move down</Button>
                                            :
                                            <Button className="float-left" style={{ marginLeft: "10px" }} variant="outline-secondary" onClick={this.handleMoveDown(collection, movie)}>Move down</Button>}
                                        <Button key={movie.movieTitle} className="float-right" variant="outline-danger" onClick={this.handleRemove(collection, movie)}>Remove</Button>
                                    </Card.Footer>
                                    :
                                    <Card.Footer>
                                        <Link to="/collections" className="btn btn-outline-success" style={{ marginRight: "10px" }} onClick={() => { this.props.addMovieToClipboard(movie.movieInfo) }}>Add to collection</Link>

                                        {!user.likedMovies.hasOwnProperty([movie.movieTitle]) ?
                                            <Button className="float-right" variant="outline-success" onClick={this.handleLike(movie.movieInfo)}>Like</Button>
                                            :
                                            <Button className="float-right" variant="outline-danger" onClick={this.handleUnlike(movie.movieInfo)}>Unlike</Button>
                                        }
                                    </Card.Footer>
                                :
                                null
                            }
                        </Card>
                    )
                })
            }

            const pageCount = Math.ceil(movies.length / 2)
            let pageButtons = [];
            for (let i = 0; i < pageCount; i++) {
                pageButtons.push(
                    <Button key={i} style={{ marginRight: "5px", marginLeft: "5px" }} onClick={this.handlePageChange(i + 1)} variant={pageNumber == i + 1 ? "primary" : "outline-primary"}>{i + 1}</Button>
                );
            }
            return (
                <Container key={collection[0]}>
                    <Card key={collection[0]}>
                        <Card.Header style={{ fontSize: '30px' }}>{collection[0]}</Card.Header>
                        <Card.Body key={collection[0]}>
                            {movieList.length > 0 ?
                                movieList
                                :
                                "This collection is empty."
                            }
                        </Card.Body>
                        <Card.Footer>
                                {auth.uid ?
                                    <span>
                                        <Link to="/collectionRatings" onClick={() => { }} style={{ marginRight: "10px" }} className="btn btn-outline-secondary">Ratings</Link>
                                        <Link to="/collectionComments" onClick={() => { }} className="btn btn-outline-secondary">Comments</Link>
                                        {collection[1].authorId == auth.uid ?
                                            collection[1].privacy == "Private" ?
                                                <Button onClick={this.handlePrivacyChange(collection)} variant="outline-danger" className="float-right">{collection[1].privacy}</Button>
                                                :
                                                <Button onClick={this.handlePrivacyChange(collection)} variant="outline-success" className="float-right">{collection[1].privacy}</Button>
                                            :
                                            null
                                        }
                                    </span>
                                    :
                                    null
                                }
                                <ButtonGroup className="float-right" style={{ marginRight: "10px" }}>
                                    {pageButtons.length > 3 ?
                                        pageNumber == 1 || pageNumber == pageButtons.length ?
                                            pageNumber == 1 ?
                                                <span>
                                                    {[pageButtons[0], pageButtons[1]]}...{pageButtons[pageButtons.length - 1]}
                                                </span>
                                                :
                                                <span>
                                                    {pageButtons[0]}...{[pageButtons[pageButtons.length - 2], pageButtons[pageButtons.length - 1]]}
                                                </span>
                                            :
                                            pageNumber == 2 || pageNumber == pageButtons.length - 1 ?
                                                pageNumber == 2 ?
                                                    <span>
                                                        {[[pageButtons[0], pageButtons[1]], pageButtons[2]]}...{pageButtons[pageButtons.length - 1]}
                                                    </span>
                                                    :
                                                    <span>
                                                        {pageButtons[0]}...{[pageButtons[pageButtons.length - 3], pageButtons[pageButtons.length - 2], pageButtons[pageButtons.length - 1]]}
                                                    </span>
                                                :
                                                <span>
                                                    {pageButtons[0]}...{[pageButtons[pageNumber - 2], pageButtons[pageNumber - 1], pageButtons[pageNumber]]}...{pageButtons[pageButtons.length - 1]}
                                                </span>
                                        :
                                        <span>
                                            {pageButtons}
                                        </span>
                                    }
                                </ButtonGroup>
                        </Card.Footer>
                    </Card>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        collection: state.collection.collectionForEdit,
        user: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeMovieFromCollection: (collection, movie) => dispatch(removeMovieFromCollection(collection, movie)),
        toggleCollectionPrivacy: (collection) => dispatch(toggleCollectionPrivacy(collection)),
        moveMovieUp: (collection, movie) => dispatch(moveMovieUp(collection, movie)),
        moveMovieDown: (collection, movie) => dispatch(moveMovieDown(collection, movie)),
        addMovieToClipboard: (movie) => dispatch(addMovieToClipboard(movie)),
        likeMovie: (movie) => dispatch(likeMovie(movie)),
        unlikeMovie: (movie) => dispatch(unlikeMovie(movie)),
        clearCollectionForEdit: () => dispatch(clearCollectionForEdit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetails);