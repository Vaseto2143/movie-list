import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

class SignIn extends Component {
    state = {
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
        this.props.signIn(this.state);
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
                                <Form.Group controlId="email">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control type="email" placeholder="E-mail" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
                                    <Form.Text><Link to="/passReset">Forgotten password?</Link></Form.Text>
                                </Form.Group>
                                <Button variant="outline-primary" type="submit">
                                    Log In
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
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);