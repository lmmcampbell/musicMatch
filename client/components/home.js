/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react'
import {setToken} from '../store/token'
import {fetchSpotifyUser} from '../store/user'
import {connect} from 'react-redux'

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
    if (this.state.isLoading) {
      return <div>LOADING!</div>
    }
    return (
      <div className="home-page">
        <h1>Welcome back to Spotify Match!</h1>
      </div>
    )
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
