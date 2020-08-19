import React, { Component } from 'react';
import { Card, Col, Form, FormControl, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMovieFromOMDb, likeMovie, unlikeMovie, addMovieToClipboard, clearFoundMovie } from '../../store/actions/movieActions';
import MovieDetails from '../movies/MovieDetails';

class CommentOnMovie extends Component {
    state = {
        searchField: '',
        foundOMDbMovie: this.props.foundOMDbMovie
    }

    render() {
        const { user, movieForComment, auth } = this.props;
        if (!auth.uid) {
            return <Redirect to='/signin' />
        } else {
            return (
                <Col>
                    <Card>
                        <MovieDetails movie={movieForComment} />
                        <Card.Footer>
                            <Form inline className="justify-content-between">
                                <FormControl type="text" placeholder="Type comment" className="mr-sm-2" onChange={this.handleChange} />
                                <Button variant="outline-success" onClick={this.handleSearch} type="submit">Submit</Button>
                            </Form>
                        </Card.Footer>
                    </Card>
                </Col>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        searchError: state.movie.searchError,
        user: state.firebase.profile,
        movieForComment: state.movie.movieForInteraction,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieFromOMDb: (movieTitle) => dispatch(getMovieFromOMDb(movieTitle)),
        clearFoundMovie: () => dispatch(clearFoundMovie()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentOnMovie);