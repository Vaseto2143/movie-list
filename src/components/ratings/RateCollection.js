import React, { Component } from 'react';
import { Card, ToggleButton, Container, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { rateCollection } from '../../store/actions/ratingActions';

class RateCollection extends Component {
    state = {
        collection: this.props.collection,
        radioValue: '5'
    }

    handleSubmit = () => {
        this.props.rateCollection(this.props.collection, this.state.radioValue)
    }

    render() {
        const radios = [
            { name: ' 1', value: '1' },
            { name: ' 2', value: '2' },
            { name: ' 3', value: '3' },
            { name: ' 4', value: '4' },
            { name: ' 5', value: '5' },
        ];
        const { auth, collection, user } = this.props;
        if (!collection) {
            return <Redirect to='/' />
        }
        else {
            return (
                <Container style={{width: "50%"}}>
                <Card >
                    <Card.Header style={{fontSize: "30px"}}>{collection[0]}</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="rating">
                                <Container style={{width: "80%"}}>
                                    <Row>
                                        {radios.map((radio, idx) => (
                                            <Col>
                                                <ToggleButton
                                                    key={idx}
                                                    type="radio"
                                                    variant="secondary"
                                                    name="radio"
                                                    value={radio.value}
                                                    checked={this.state.radioValue === radio.value}
                                                    onChange={(e) => this.setState({ radioValue: e.currentTarget.value })}
                                                    style={{ marginRight: "10px" }}
                                                >
                                                    {radio.name}
                                                </ToggleButton>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Link onClick={this.handleSubmit} to="/" className="btn btn-outline-secondary float-right">Submit</Link>
                    </Card.Footer>
                </Card>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.profile,
        auth: state.firebase.auth,
        collection: state.collection.collectionForEdit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        rateCollection: (collection, rating) => dispatch(rateCollection(collection, rating))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RateCollection);