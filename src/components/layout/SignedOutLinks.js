import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuthError } from '../../store/actions/authActions';
import { clearFoundCollections } from '../../store/actions/collectionActions';

const SignedOutLinks = (props) => {
    return (
        <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
                <li className="nav-item"><a className="nav-link"><NavLink onClick={props.sign} to='/signin' style={{fontSize: "20px", textDecoration: "none"}}>Sign In</NavLink></a></li>
                <li className="nav-item"><a className="nav-link"><NavLink onClick={props.sign} to='/signup' style={{fontSize: "20px", textDecoration: "none"}}>Sign Up</NavLink></a></li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        sign: () => {
            dispatch(clearAuthError());
            dispatch(clearFoundCollections())
        }
    }
}

export default connect(null, mapDispatchToProps)(SignedOutLinks);