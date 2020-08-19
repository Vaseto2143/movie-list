import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { resetPassword } from '../../store/actions/authActions';

class ResetPassword extends Component {
    state = {
        email: '',
        emailIsValid: null
    }

    handleChange = (e) => {
        const regex = /\S+@\S+\.\S+/;
        const emailIsValid = regex.test(e.target.value);
        this.setState({
            email: e.target.value,
            emailIsValid
        })
    }

    handleSubmit = (e) => {
        this.props.resetPassword(this.state.email);
    }

    handleEmptySubmit = (e) => {
        this.setState({
            emailIsValid: false
        })
    }

    render() {
        const { auth } = this.props;
        const { emailIsValid } = this.state;
        if (auth.uid) {
            return <Redirect to='/' />
        } else {
            return (
                <Card>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" placeholder="E-mail" onChange={this.handleChange} />
                            </Form.Group>
                            {emailIsValid ?
                                <Link to="/signin" className="btn btn-outline-primary">
                                    Send E-mail
                                </Link>
                                :
                                <Button variant="outline-primary" onClick={this.handleEmptySubmit}>
                                    Send E-mail
                                </Button>
                            }

                        </Form>
                        {emailIsValid == false ? <Alert variant="danger" style={{ marginTop: "15px", marginBottom: "0" }}>Enter a valid E-mail!</Alert> : null}
                    </Card.Body>
                </Card>
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
        resetPassword: (email) => dispatch(resetPassword(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);