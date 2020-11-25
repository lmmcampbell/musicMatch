import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtists} from '../store/artists'
import ListGroup from 'react-bootstrap/ListGroup'

export class TopArtists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.fetchTopArtists()
    this.setState({isLoading: false})
  }

  render() {
    if (this.state.isLoading) {
      return <div>LOADING</div>
    }
    console.log(this.props.topArtists)
    let artists = this.props.topArtists
    return (
      <ListGroup className="top-list">
        <h2 className="title">Top Artists</h2>
        <div>
          {artists && artists.length ? (
            artists.map(artist => {
              return (
                <ListGroup.Item key={artist.id}>{artist.name}</ListGroup.Item>
              )
            })
          ) : (
            <div>No top artists to view</div>
          )}
        </div>
      </ListGroup>
    )
  }
}

const mapStateToProps = state => ({
  topArtists: state.topArtists,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchTopArtists: () => dispatch(fetchTopArtists())
})

export default connect(mapStateToProps, mapDispatchToProps)(TopArtists)
