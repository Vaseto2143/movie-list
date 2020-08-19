import React, { Component } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { removeMovieFromCollection, toggleCollectionPrivacy, moveMovieDown, moveMovieUp } from '../../store/actions/collectionActions';
import MovieDetails from '../movies/MovieDetails';
import { addMovieToClipboard } from '../../store/actions/movieActions';

class CollectionDetails extends Component {
    state = {
        collection: this.props.collection
    }

    handleRemove = (collection, movie) => (e) => {
        this.props.removeMovieFromCollection(collection, movie);
        this.setState({
            collection: this.props.collection
        })
    }

    handlePrivacyChange = (collection) => (e) => {
        this.props.toggleCollectionPrivacy(collection);
        this.setState({
            collection: this.props.collection
        })
    }

    handleMoveUp = (collection, movie) => (e) => {
        this.props.moveMovieUp(collection, movie)
        this.setState({
            collection: this.props.collection
        })
    }

    handleMoveDown = (collection, movie) => (e) => {
        this.props.moveMovieDown(collection, movie)
        this.setState({
            collection: this.props.collection
        })
    }

    render() {
        const { auth, collection, user } = this.props;
        if (!collection) {
            if (!auth.uid) {
                return <Redirect to='/' />
            }
            else {
                return <Redirect to='/collections' />
            }
        }
        else {
            const movieList = Object.values(collection[1].movies).map(movie => {
                return (
                    <Card style={{ marginTop: '20px' }} key={movie.movieTitle}>
                        <MovieDetails key={movie.position} movie={movie.movieInfo} position={movie.position} />
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
                                    <Link /* to="/collections" */ className="btn btn-outline-success" style={{ marginRight: "10px" }} /* onClick={this.props.addMovieToClipboard(movie)} */>Add to collection</Link>

                                    {!user.likedMovies.hasOwnProperty([movie.movieTitle]) ?
                                        <Button className="float-right" variant="outline-success" onClick={this.handleLike}>Like</Button>
                                        :
                                        <Button className="float-right" variant="outline-danger" onClick={this.handleUnlike}>Unlike</Button>
                                    }
                                </Card.Footer>
                            :
                            null
                        }


                    </Card>
                )
            });
            return (
                <Container>
                    <Card key={collection}>
                        <Card.Header style={{ fontSize: '30px' }}>{collection[0]}</Card.Header>
                        <Card.Body>
                            {movieList.length > 0 ?
                                movieList
                                :
                                "This collection is empty."
                            }
                        </Card.Body>
                        {auth.uid ?
                            <Card.Footer>
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
                            </Card.Footer>
                            :
                            null
                        }


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
        addMovieToClipboard: (movie) => dispatch(addMovieToClipboard(movie))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetails);