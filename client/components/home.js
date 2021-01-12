import React from 'react'
import {setToken} from '../store/token'
import {fetchSpotifyUser} from '../store/user'
import {connect} from 'react-redux'
import {UserHome} from './index'
import {Container, Row, Col} from 'react-bootstrap'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
    this.getHashParams = this.getHashParams.bind(this)
  }

  getHashParams() {
    var hashParams = {}
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
    var params = this.getHashParams()
    var error = params.error
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

const mapStateToProps = state => {
  return {
    token: state.token,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch(setToken(token)),
    fetchSpotifyUser: token => dispatch(fetchSpotifyUser(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
