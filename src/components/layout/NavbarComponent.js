import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import { connect } from 'react-redux';

const NavbarComponent = (props) => {
    const { auth, user } = props;
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Link to="/" style={{fontSize: "30px", textDecoration: "none"}}>Home</Link>
                {auth.isLoaded && user.isLoaded && links}
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        user: state.firebase.profile
    }
}

export default connect(mapStateToProps)(NavbarComponent);