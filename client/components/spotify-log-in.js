/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react'
import {setToken} from '../store/token'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'

class SpotifyLogIn extends React.Component {
  render() {
    return (
      <div className="log-in">
        <h1 className="log-in-item">Let's get started!</h1>
        <div className="log-in-item">
          <Button variant="light" href="/login">
            Log in with Spotify
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch(setToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyLogIn)
