import React from 'react'
import {connect} from 'react-redux'
import {fetchMatchSongs} from '../store/matchSongs'
import {fetchMatchArtists} from '../store/matchArtists'
import {Container, Row, Col} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { ThunkDispatch } from 'redux-thunk';
import { AppState, MatchSongs, MatchArtists, MatchesAction } from '../types';

export type MatchDataPageProps = {
  fetchMatchSongs: (id: number) => undefined;
  fetchMatchArtists: (id: number) => undefined;
  matchSongs: MatchSongs;
  matchArtists: MatchArtists;
};

export type MatchDataPageState = {
  isLoading: boolean;
}

export class MatchDataPage extends React.Component<MatchDataPageProps, MatchDataPageState> {
  constructor(props: MatchDataPageProps) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    console.log(this.props.params)
    console.log(this.props.match)
    this.props.fetchMatchSongs(this.props.match.params.id)
    this.props.fetchMatchArtists(this.props.match.params.id)
    this.setState({isLoading: false})
  }

  render() {
    if (this.state.isLoading) {
      return <div>LOANDING</div>
    }
    const matchSongs = this.props.matchSongs
    const matchArtists = this.props.matchArtists
    return (
      <Container fluid>
        <ListGroup className="top-list">
          <Row>
            <Col>
              <h3 className="title">Shared Songs</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{span: 8, offset: 2}}>
              {matchSongs && matchSongs.length ? (
                matchSongs.map(song => {
                  return (
                    <ListGroup.Item key={song.id} id={song.spotifyId}>
                      <span className="italics">{song.name} </span>by{' '}
                      {song.artists}
                    </ListGroup.Item>
                  )
                })
              ) : (
                <div>No shared songs!</div>
              )}
            </Col>
          </Row>
        </ListGroup>
        <ListGroup className="top-list">
          <Row>
            <Col>
              <h3 className="title">Shared Artists</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{span: 8, offset: 2}}>
              {matchArtists && matchArtists.length ? (
                matchArtists.map(artist => {
                  return (
                    <ListGroup.Item key={artist.id} id={artist.spotifyId}>
                      {artist.name}
                    </ListGroup.Item>
                  )
                })
              ) : (
                <div>No shared artists!</div>
              )}
            </Col>
          </Row>
        </ListGroup>
      </Container>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  matchSongs: state.matchSongs,
  matchArtists: state.matchArtists,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, MatchesAction>) => ({
  fetchMatchSongs: (id: number) => dispatch(fetchMatchSongs(id)),
  fetchMatchArtists: (id: number) => dispatch(fetchMatchArtists(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchDataPage)
