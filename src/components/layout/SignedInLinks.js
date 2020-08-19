import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { clearMovieClipboard, clearFoundMovie } from '../../store/actions/movieActions';
import { clearFoundCollections } from '../../store/actions/collectionActions';


const SignedInLinks = (props) => {
    return (
        <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
                {props.auth.uid ?
                    <li className="nav-item"><a className="nav-link" style={{ fontSize: "20px", textDecoration: "none" }}>{`${props.user.firstName} ${props.user.lastName}`}</a></li>
                    :
                    null}
                <li className="nav-item"><a className="nav-link" onClick={props.clearClipboard}><NavLink to='/collections' style={{ fontSize: "20px", textDecoration: "none" }}>My Collections</NavLink></a></li>
                <li className="nav-item"><a className="nav-link" onClick={props.clearClipboard}><NavLink to='/likedMovies' style={{ fontSize: "20px", textDecoration: "none" }}>Liked Movies</NavLink></a></li>
                <li className="nav-item"><a className="nav-link" onClick={props.signOut}><NavLink to='/signin' style={{ fontSize: "20px", textDecoration: "none" }}>Sign Out</NavLink></a></li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.profile,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signOut());
            dispatch(clearFoundMovie());
            dispatch(clearFoundCollections());
        },
        clearClipboard: () => {
            dispatch(clearMovieClipboard());
            dispatch(clearFoundCollections())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);