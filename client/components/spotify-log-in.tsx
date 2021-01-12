/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react'
import {setToken} from '../store/token'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import { ThunkDispatch } from 'redux-thunk';
import { AppState, Token, TokenAction } from '../types';

export type SpotifyLogInProps = {
  setToken: (token: Token) => undefined;
};

class SpotifyLogIn extends React.Component <SpotifyLogInProps, null> {
  render() {
    return (
      <div className="log-in">
        <h1 className="log-in-title">Let's get started!</h1>
        <div className="log-in-button">
          <Button variant="light" href="/login">
            Log in with Spotify
          </Button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, TokenAction>) => {
  return {
    setToken: (token: Token) => dispatch(setToken(token))
  }
}

export default connect(null, mapDispatchToProps)(SpotifyLogIn)
