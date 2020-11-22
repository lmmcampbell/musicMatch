import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  SpotifyLogIn,
  Home,
  TopArtists,
  TopSongs,
  Matches,
  MatchDataPage
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/home" component={Home} />
        <Route path="/artists" component={TopArtists} />
        <Route path="/songs" component={TopSongs} />
        <Route exact path="/matches" component={Matches} />
        <Route exact path="/matches/:id" component={MatchDataPage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* <Route path="/home" component={UserHome} /> */}
            <Route path="/home" component={Home} />
            <Route path="/artists" component={TopArtists} />
            <Route path="/songs" component={TopSongs} />
            <Route exact path="/matches" component={Matches} />
            <Route exact path="/matches/:id" component={MatchDataPage} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={SpotifyLogIn} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
