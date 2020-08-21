import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class MovieDetails extends Component {
    state = {
        movie: this.props.movie,
        position: this.props.position
    }

    render() {
        const { auth } = this.props;
        const { movie, position } = this.state;
        return (
            <div key={position}>
                <Card.Header style={{ fontSize: '20px' }}>{position ? <b>{position}.  </b> : null}{movie['Title']}</Card.Header>
                <Card.Body>
                    <b>Year:</b> {movie['Year']}<br />
                    <b>Genre:</b> {movie['Genre']}<br />
                    <b>Plot:</b> {movie['Plot']}<br />
                </Card.Body>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(MovieDetails);