import React from 'react'
import {connect} from 'react-redux'
import {fetchTopArtists} from '../store/artists'
import ListGroup from 'react-bootstrap/ListGroup'
import {Container, Row, Col} from 'react-bootstrap'

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
    let artists = this.props.topArtists
    return (
      <Container>
        <ListGroup id="top-list">
          <Row>
            <Col>
              <h2 className="title">Your Top Artists</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{span: 8, offset: 2}}>
              {artists && artists.length ? (
                artists.map(artist => {
                  return (
                    <ListGroup.Item key={artist.id}>
                      {artist.name}
                    </ListGroup.Item>
                  )
                })
              ) : (
                <div>No top artists to view</div>
              )}
            </Col>
          </Row>
        </ListGroup>
      </Container>
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
