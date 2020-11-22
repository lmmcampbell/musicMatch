import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from 'react-bootstrap/Navbar'

const NavbarComponent = ({handleClick, isLoggedIn}) => (
  <div>
    <Navbar bg="light">
      <Navbar.Brand>
        <img
          alt=""
          src="/music.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        SPOTIFY MATCH
      </Navbar.Brand>
      {isLoggedIn && (
        <>
          <Link to="/home">Home</Link>
          <Link to="/artists">Top Artists</Link>
          <Link to="/songs">Top Songs</Link>
          <Link to="/matches">Matches</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </>
      )}
    </Navbar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
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
