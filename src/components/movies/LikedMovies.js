import React, { Component } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { unlikeMovie, addMovieToClipboard } from '../../store/actions/movieActions';
import MovieDetails from './MovieDetails';

class LikedMovies extends Component {
    state = {
        movies: this.props.movies,
    }

    handleUnlike = (movie) => (e) => {
        e.preventDefault();
        this.props.unlikeMovie(movie);
        this.setState({
            movies: this.props.movies
        })
    }

    handleAddToCollection = (movie) => (e) => {
        this.props.addMovieToClipboard(movie);
    }

    render() {
        const { auth } = this.props;
        const { movies } = this.state;
        if (!auth.uid) {
            return <Redirect to='/signin' />
        }
        else {
            const moviesForList = Object.values(movies);
            const movieList = moviesForList.map(movie => {
                return (
                    <Card style={{ marginTop: '20px' }} key={movie['Title']}>
                        <MovieDetails movie={movie} />
                        <Card.Footer>
                            <Link to="/collections" className="btn btn-outline-success" style={{ marginRight: "10px" }} onClick={this.handleAddToCollection(movie)}>Add to collection</Link>
                            <Button className="float-right" type="submit" variant="outline-danger" onClick={this.handleUnlike(movie)}>Unlike</Button>
                        </Card.Footer>
                    </Card>
                )
            })
            return (
                <Container>
                    <Card>
                        <Card.Header style={{ fontSize: '30px' }}>
                            Liked Movies
                    </Card.Header>
                        <Card.Body>
                            {movieList.length > 0 ? movieList : "You haven't liked any movies."}
                        </Card.Body>
                    </Card>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.firebase.profile.likedMovies,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        unlikeMovie: (movie) => dispatch(unlikeMovie(movie)),
        addMovieToClipboard: (movie) => dispatch(addMovieToClipboard(movie))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedMovies);