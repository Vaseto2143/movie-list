import React, { Component } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const { authError, auth } = this.props;
        if (auth.uid) {
            return <Redirect to='/' />
        } else {
            return (
                <Container>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="firstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" placeholder="First name" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Last name" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control type="email" placeholder="E-mail" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
                                </Form.Group>
                                <Button variant="outline-primary" type="submit">
                                    Sign Up
                            </Button>
                            </Form>
                            {authError ? <Alert variant="danger" style={{ marginTop: "15px", marginBottom: "0" }}>{authError}</Alert> : null}
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
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (credentials) => dispatch(signUp(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);