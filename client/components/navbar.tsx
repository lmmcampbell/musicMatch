import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import Navbar from 'react-bootstrap/Navbar'
import {Nav} from 'react-bootstrap'
import { ThunkDispatch } from 'redux-thunk';
import { AppState, UserAction } from '../types';

export type NavbarProps = {
   handleClick: () => undefined;
   isLoggedIn: boolean;
};

export type NavbarState = {
  isLoading: boolean;
}

const NavbarComponent = ({handleClick, isLoggedIn}) => (
  <div>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img
          alt=""
          src="/music.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {'  '}
        Music Match
      </Navbar.Brand>
      {isLoggedIn && (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav.Link as={NavLink} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/artists">
              Top Artists
            </Nav.Link>
            <Nav.Link as={NavLink} to="/songs">
              Top Songs
            </Nav.Link>
            <Nav.Link as={NavLink} to="/matches">
              Matches
            </Nav.Link>
            {/* <img src={user.images} id="nav-bar-image"/> */}
            <Nav.Link href="#" onClick={handleClick}>
              Logout
            </Nav.Link>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state: AppState) => {
  return {
    isLoggedIn: !!state.user,
  }
}

const mapDispatch = (dispatch: ThunkDispatch<AppState, undefined, UserAction>) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavbarComponent)

/**
 * PROP TYPES
 */
NavbarComponent.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
