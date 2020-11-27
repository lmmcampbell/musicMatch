import React from 'react'
import {connect} from 'react-redux'
import {fetchMatchSongs} from '../store/matchSongs'
import {fetchMatchArtists} from '../store/matchArtists'
import ListGroup from 'react-bootstrap/ListGroup'

export class MatchDataPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
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
    console.log('ZEBRA', matchSongs)
    return (
      <div style={{marginBottom: '10px'}}>
        <ListGroup className="top-list">
          <h3 className="title">Shared Songs</h3>
          <div>
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
          </div>
        </ListGroup>
        <ListGroup className="top-list">
          <h3 className="title">Shared Artists</h3>
          <div>
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
          </div>
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  matchSongs: state.matchSongs,
  matchArtists: state.matchArtists,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchMatchSongs: id => dispatch(fetchMatchSongs(id)),
  fetchMatchArtists: id => dispatch(fetchMatchArtists(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchDataPage)
