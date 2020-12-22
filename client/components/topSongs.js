import React from 'react'
import {connect} from 'react-redux'
import {fetchTopSongs} from '../store/songs'
import ListGroup from 'react-bootstrap/ListGroup'
import {Container, Row, Col} from 'react-bootstrap'

export class TopSongs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.fetchTopSongs()
    this.setState({isLoading: false})
  }

  render() {
    if (this.state.isLoading) {
      return <div>LOADING</div>
    }
    let songs = this.props.topSongs
    return (
      <Container>
        <ListGroup id="top-list">
          <Row>
            <Col>
              <h2 className="title">Your Top Songs</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{span: 8, offset: 2}}>
              {songs && songs.length ? (
                songs.map(song => {
                  return (
                    <ListGroup.Item key={song.id}>
                      <span className="italics">{song.name} </span>by{' '}
                      {song.artists}
                    </ListGroup.Item>
                  )
                })
              ) : (
                <div>No top songs to view</div>
              )}
            </Col>
          </Row>
        </ListGroup>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  topSongs: state.topSongs,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchTopSongs: () => dispatch(fetchTopSongs())
})

export default connect(mapStateToProps, mapDispatchToProps)(TopSongs)
