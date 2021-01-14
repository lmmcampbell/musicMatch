/* eslint-disable camelcase */
import React from 'react'
import {setToken} from '../store/token'
import {fetchSpotifyUser} from '../store/user'
import {connect} from 'react-redux'
import {UserHome} from './index'
import {Container, Row, Col} from 'react-bootstrap'
import { ThunkDispatch } from 'redux-thunk';
import { AppState, User, Token } from '../types';

export type HomeProps = {
  setToken: (token: Token) => undefined;
  fetchSpotifyUser: (accessToken: string) => undefined;
  user: User;
};

export type HomeState = {
  isLoading: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props)
    this.state = {
      isLoading: true
    }
    this.getHashParams = this.getHashParams.bind(this)
  }

  getHashParams() {
    var hashParams: any = {}
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    // eslint-disable-next-line no-cond-assign
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    return hashParams
  }

  componentDidMount() {
    let params: any = this.getHashParams()
    // var error = params.error
    if (params.access_token) {
      let tokenObj = {
        access_token: params.access_token,
        refresh_token: params.refresh_token
      }
      this.props.setToken(tokenObj)
      this.props.fetchSpotifyUser(params.access_token)
    }
    this.setState({isLoading: false})
  }

  render() {
    if (this.state.isLoading || !this.props.user) {
      return (
        <Container className="home-page">
          <Row>
            <Col>
              <h3>Welcome back to Spotify Match!</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Loading Spotify data...</h4>
            </Col>
          </Row>
          <div className="music-notes">
            <div className="note note-1">♫</div>
            <div className="note note-2">&#9833;</div>
            <div className="note note-3">&#9834;</div>
            <div className="note note-4">&#9833;</div>
          </div>
        </Container>
      )
    }

    return <UserHome />
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, any>)  => {
  return {
    setToken: (token: Token) => dispatch(setToken(token)),
    fetchSpotifyUser: (accessToken: string) => dispatch(fetchSpotifyUser(accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
