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
    const matchSongs = this.props.matchSongs
    const matchArtists = this.props.matchArtists
    if (this.state.isLoading) {
      return (
        <div>
          <ListGroup className="top-list">
            <div>
              {matchSongs && matchSongs.length ? (
                matchSongs.map(song => {
                  return (
                    <ListGroup.Item key={song.id}>{song.name}</ListGroup.Item>
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

    return <div className="match-page">HELLO!</div>
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
