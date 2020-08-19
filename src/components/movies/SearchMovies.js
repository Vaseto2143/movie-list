import React, { Component } from 'react';
import { Card, Col, Form, FormControl, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMovieFromOMDb, likeMovie, unlikeMovie, addMovieToClipboard, clearFoundMovie } from '../../store/actions/movieActions';
import MovieDetails from './MovieDetails';
import { clearFoundCollections } from '../../store/actions/collectionActions';

class SearchMovies extends Component {
    state = {
        searchField: '',
        foundOMDbMovie: this.props.foundOMDbMovie
    }

    handleChange = (e) => {
        this.setState({
            searchField: e.target.value
        })
    }

    handleSearch = (e) => {
        e.preventDefault();
        let movieName = this.state.searchField;
        this.props.clearFoundMovie();
        this.props.getMovieFromOMDb(movieName);
        this.setState({
            foundOMDbMovie: this.props.foundOMDbMovie
        })
    }

    handleAssign = (foundMovie) => (e) => {
        this.props.addMovieToClipboard(foundMovie);
        this.props.clearFoundCollections()
    }

    handleLike = (e) => {
        this.props.likeMovie(this.props.foundOMDbMovie);
        this.setState({
            foundOMDbMovie: this.props.foundOMDbMovie
        })
    }

    handleUnlike = (e) => {
        this.props.unlikeMovie(this.props.foundOMDbMovie);
        this.setState({
            foundOMDbMovie: this.props.foundOMDbMovie
        })
    }

    render() {
        const { user, foundOMDbMovie, searchError } = this.props;
        return (
            <Col>
                <Card style={{marginLeft: "50px", marginRigth: "20px"}}>
                    <Card.Header style={{ fontSize: "30px" }}>Movies</Card.Header>
                    <Card.Body>
                        <Form inline className="justify-content-between">
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleChange} />
                            <Button variant="outline-primary" onClick={this.handleSearch} type="submit">Search</Button>
                        </Form>
                        {foundOMDbMovie ?
                            <Card style={{ marginTop: '10px' }}>
                                <MovieDetails movie={foundOMDbMovie} />
                                {user.likedMovies ?
                                    <Card.Footer>
                                        <Link to="/collections" className="btn btn-outline-success" style={{ marginRight: "10px" }} onClick={this.handleAssign(foundOMDbMovie)}>Add to collection</Link>
                                        <Link to="/rateMovie" className="btn btn-outline-secondary" style={{ marginRight: "10px" }} onClick={this.props.addMovieToClipboard(foundOMDbMovie)}>Rate</Link>
                                        <Link to="/commentMovie" className="btn btn-outline-secondary" style={{ marginRight: "10px" }} onClick={this.props.addMovieToClipboard(foundOMDbMovie)}>Comment</Link>

                                        {!user.likedMovies.hasOwnProperty(foundOMDbMovie['Title']) ?
                                            <Button className="float-right" variant="outline-success" onClick={this.handleLike}>Like</Button>
                                            :
                                            <Button className="float-right" variant="outline-danger" onClick={this.handleUnlike}>Unlike</Button>
                                        }
                                    </Card.Footer>
                                    :
                                    null
                                }
                            </Card>
                            :
                            this.props.searchError ?
                                <Alert variant="danger" style={{ marginTop: "15px", marginBottom: "0" }}>{searchError}</Alert>
                                :
                                null
                        }
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchError: state.movie.searchError,
        foundOMDbMovie: state.movie.foundOMDbMovie,
        user: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieFromOMDb: (movieTitle) => dispatch(getMovieFromOMDb(movieTitle)),
        clearFoundMovie: () => dispatch(clearFoundMovie()),
        likeMovie: (movie) => dispatch(likeMovie(movie)),
        unlikeMovie: (movie) => dispatch(unlikeMovie(movie)),
        addMovieToClipboard: (movie) => dispatch(addMovieToClipboard(movie)),
        clearFoundCollections: () => dispatch(clearFoundCollections())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMovies);