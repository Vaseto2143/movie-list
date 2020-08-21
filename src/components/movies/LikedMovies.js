import React, { Component } from 'react';
import { Card, Button, Container, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { unlikeMovie, addMovieToClipboard } from '../../store/actions/movieActions';
import MovieDetails from './MovieDetails';

class LikedMovies extends Component {
    state = {
        movies: this.props.movies,
        pageNumber: 1
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

    handlePageChange = (redirectTo) => (e) => {
        this.setState({
            pageNumber: redirectTo
        })
    }

    render() {
        const { auth } = this.props;
        const moviesObject = this.state.movies;
        const { pageNumber } = this.state
        if (!auth.uid) {
            return <Redirect to='/signin' />
        }
        else {
            const movies = Object.values(moviesObject);
            const moviesForPage = movies.length >= pageNumber * 2 ? [movies[(pageNumber * 2) - 2], movies[(pageNumber * 2) - 1]] : [movies[(pageNumber * 2) - 2]]
            const movieList = moviesForPage.map(movie => {
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
            const pageCount = Math.ceil(movies.length / 2)
            let pageButtons = [];
            for (let i = 0; i < pageCount; i++) {
                pageButtons.push(
                    <Button style={{ marginRight: "5px", marginLeft: "5px" }} onClick={this.handlePageChange(i + 1)} variant={pageNumber == i + 1 ? "primary" : "outline-primary"}>{i + 1}</Button>
                );
            }
            return (
                <Container>
                    <Card>
                        <Card.Header style={{ fontSize: '30px' }}>
                            Liked Movies
                    </Card.Header>
                        <Card.Body>
                            {movieList.length > 0 ? movieList : "You haven't liked any movies."}
                        </Card.Body>
                        <Card.Footer>
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