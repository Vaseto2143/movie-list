import React, { Component } from 'react';
import SearchMovies from '../movies/SearchMovies';
import SearchCollections from '../collections/SearchCollections';
import { Row, Container } from 'react-bootstrap';

class Homepage extends Component {
    render() {
        return (
            <Row>
                <SearchMovies />
                <SearchCollections />
            </Row>
        )
    }
}

export default Homepage;