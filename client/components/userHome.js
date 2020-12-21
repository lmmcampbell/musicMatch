import React from 'react'
import {fetchTopArtists} from '../store/artists'
import {fetchTopSongs} from '../store/songs'
import {fetchMatches} from '../store/matches'
import {connect} from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.fetchTopArtists()
    this.props.fetchTopSongs()
    this.props.fetchMatches()
    this.setState({
      isLoading: false
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="home-page">
          <div>LOADING!</div>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading spinner</span>
          </Spinner>
        </div>
      )
    }

    let artistHighlight = this.props.artistHighlight
    let songHighlight = this.props.songHighlight
    let user = this.props.user
    let numberMatches = this.props.matches.numberMatches
    let matchHighlight = this.props.matchHighlight

    return (
      <div className="user-home">
        <Card className="user-card" style={{width: '18rem'}}>
          <Card.Img variant="top" src={user.images} />
          <Card.Body>
            <Card.Title>{user.display_name}</Card.Title>
            <Card.Text>Spotify Id: {user.spotifyId}</Card.Text>
            <Button
              id="matchSongsButton"
              variant="outline-info"
              className="matchButton"
              href="/matches"
            >
              {numberMatches} Matches
            </Button>
          </Card.Body>
        </Card>
        {artistHighlight.name && (
          <Card className="user-card" style={{width: '18rem'}}>
            <Card.Img variant="top" src={artistHighlight.images[0]} />
            <Card.Body>
              <Card.Title>{artistHighlight.name}</Card.Title>
              <Button
                id="matchSongsButton"
                variant="outline-info"
                className="matchButton"
                href="/artists"
              >
                More Top Artists
              </Button>
            </Card.Body>
          </Card>
        )}
        {songHighlight.name && (
          <Card className="user-card" style={{width: '18rem'}}>
            <Card.Img variant="top" src={songHighlight.images[0]} />
            <Card.Body>
              <Card.Title>{songHighlight.name}</Card.Title>
              <Button
                id="matchSongsButton"
                variant="outline-info"
                className="matchButton"
                href="/songs"
              >
                More Top Songs
              </Button>
            </Card.Body>
          </Card>
        )}
        {matchHighlight.display_name && (
          <Card className="user-card" style={{width: '18rem'}}>
            {matchHighlight.images[0] && (
              <Card.Img variant="top" src={matchHighlight.images[0]} />
            )}
            <Card.Body>
              <Card.Title>{matchHighlight.spotifyId}</Card.Title>
              <Button
                id="matchSongsButton"
                variant="outline-info"
                className="matchButton"
                href="/matches"
              >
                More Matches
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    topArtists: state.topArtists,
    topSongs: state.topSongs,
    artistHighlight: state.artistHighlight,
    songHighlight: state.songHighlight,
    matchHighlight: state.matchHighlight,
    matches: state.matches
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTopArtists: () => dispatch(fetchTopArtists()),
    fetchTopSongs: () => dispatch(fetchTopSongs()),
    fetchMatches: () => dispatch(fetchMatches())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
