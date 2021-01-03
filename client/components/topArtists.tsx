import React from 'react'
import { Dispatch } from 'redux';
import {connect} from 'react-redux'
import {fetchTopArtists} from '../store/artists'
import ListGroup from 'react-bootstrap/ListGroup'
import {Container, Row, Col} from 'react-bootstrap'
import { TopArtists, AppState } from '../types';

export type TopArtistsProps = {
  fetchTopArtists: () => undefined;
  topArtists: TopArtists;
}

export type TopArtistsState = {
  isLoading: boolean;
}

export class TopArtistsComponent extends React.Component<TopArtistsProps, TopArtistsState> {
  constructor(props: TopArtistsProps) {
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
      <Container fluid className="top-artist-page">
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

const mapStateToProps = (state: AppState) => ({
  topArtists: state.topArtists
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchTopArtists: () => dispatch(fetchTopArtists())
})

export default connect(mapStateToProps, mapDispatchToProps)(TopArtistsComponent)
