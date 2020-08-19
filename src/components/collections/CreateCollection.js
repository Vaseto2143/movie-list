import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Card, Alert, ToggleButton, Container } from 'react-bootstrap';
import { createCollection } from '../../store/actions/collectionActions'

class CreateCollection extends Component {
    state = {
        title: 'Untitled',
        radioValue: 'Private',
    }

    handleSubmit = (e) => {
        this.props.createCollection(this.state.title, this.state.radioValue);
    }

    handleEnterSubmit = (e) => {
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render() {
        const { authError, auth } = this.props;
        const radios = [
            { name: ' Private', value: 'Private' },
            { name: ' Public', value: 'Public' },
        ];
        if (!auth.uid) {
            return <Redirect to='/signin' />
        } else {
            return (
                <Container>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={this.handleEnterSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Title" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="privacy">
                                    {radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            type="radio"
                                            variant="light"
                                            name="radio"
                                            value={radio.value}
                                            checked={this.state.radioValue === radio.value}
                                            onChange={(e) => this.setState({ radioValue: e.currentTarget.value })}
                                            style={{ marginRight: "10px" }}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </Form.Group>
                                <Link to="/collections" className="btn btn-outline-primary" onClick={this.handleSubmit}>
                                    Create
                                </Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCollection: (collectionTitle, collectionPrivacy) => dispatch(createCollection(collectionTitle, collectionPrivacy)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection)