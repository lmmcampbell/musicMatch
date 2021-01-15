/* eslint-disable complexity */
import React from 'react'
import {fetchTopArtists} from '../store/artists'
import {fetchTopSongs} from '../store/songs'
import {fetchMatches} from '../store/matches'
import {connect} from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import {Row, Container, Col} from 'react-bootstrap'
import { ThunkDispatch } from 'redux-thunk';
import { AppState, Artist, User, Song, ArtistsAction, MatchesAction, SongsAction, UserAction } from '../types';

export type UserHomeProps = {
  fetchTopSongs: () => undefined;
  fetchTopArtists: () => undefined;
  fetchMatches: () => undefined;
  artistHighlight: Artist;
  songHighlight: Song;
  matchHighlight: User;
}

export type UserHomeState = {
  isLoading: boolean;
}

export class UserHome extends React.Component<UserHomeProps, UserHomeState> {
  constructor(props: UserHomeProps) {
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
    let matchHighlight = this.props.matchHighlight

    return (
      <Container fluid>
        {matchHighlight &&
          matchHighlight.display_name && (
            <Row className="user-home-row blue-row">
              <Col xs={12} md={{span: 5, offset: 1}}>
                {matchHighlight.images[0] && (
                  <img src={matchHighlight.images[0]} />
                )}
              </Col>
              <Col xs={12} md={{span: 5}} className="details-box">
                <div className="text-box">
                  <h3>You've matched with:</h3>
                  <h2>{matchHighlight.spotifyId}</h2>
                </div>
                <Button
                  id="matchSongsButton"
                  variant="info"
                  className="matchButton"
                  href="/matches"
                >
                  More Matches
                </Button>
              </Col>
            </Row>
          )}

        {artistHighlight &&
          artistHighlight.name && (
            <Row className="user-home-row pink-row">
              <Col
                xs={{span: 12, order: 'last'}}
                md={{span: 5, offset: 1, order: 'first'}}
                className="details-box"
              >
                <div className="text-box">
                  <h3>You Love:</h3>
                  <h2>{artistHighlight.name}</h2>
                </div>
                <Button
                  id="matchSongsButton"
                  variant="info"
                  className="matchButton"
                  href="/artists"
                >
                  See More Top Artists
                </Button>
              </Col>
              <Col xs={{span: 12, order: 'first'}} md={{span: 5, order: 'last'}}>
                <img src={artistHighlight.images[0]} />
              </Col>
            </Row>
          )}

        {songHighlight &&
          songHighlight.name && (
            <Row className="user-home-row blue-row">
              <Col xs={12} md={{span: 5, offset: 1}}>
                <img src={songHighlight.images[0]} />
              </Col>
              <Col xs={12} md={{span: 5}} className="details-box">
                <div className="text-box">
                  <h3>You Love:</h3>
                  <h2>{songHighlight.name}</h2>
                </div>
                <Button
                  id="matchSongsButton"
                  variant="info"
                  className="matchButton"
                  href="/songs"
                >
                  See More Top Songs
                </Button>
              </Col>
            </Row>
          )}
      </Container>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    artistHighlight: state.artistHighlight,
    songHighlight: state.songHighlight,
    matchHighlight: state.matchHighlight,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, ArtistsAction | SongsAction | MatchesAction | UserAction >) => {
  return {
    fetchTopSongs: () => dispatch(fetchTopSongs()),
    fetchTopArtists: () => dispatch(fetchTopArtists()),
    fetchMatches: () => dispatch(fetchMatches())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
