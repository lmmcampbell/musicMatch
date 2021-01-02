import React from 'react'
import { Dispatch } from 'redux';
import {connect} from 'react-redux'
import {fetchTopSongs} from '../store/songs'
import ListGroup from 'react-bootstrap/ListGroup'
import {Container, Row, Col} from 'react-bootstrap'
import { TopSongs, AppState } from '../types';

export type TopSongsProps = {
  fetchTopSongs: () => undefined;
  topSongs: TopSongs;
}

export type TopSongsState = {
  isLoading: boolean;
}

export class TopSongsComponent extends React.Component<TopSongsProps, TopSongsState> {
  constructor(props: TopSongsProps) {
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
      <Container fluid className="top-song-page">
        <ListGroup id="top-list">
          <Row>
            <Col>
              <h2 className="title">Your Top Songs</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={{span: 8, offset: 2}}>
              {songs && songs.length ? (
                songs.map(song  => {
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

const mapStateToProps = (state: AppState) => ({
  topSongs: state.topSongs,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchTopSongs: () => dispatch(fetchTopSongs())
})

export default connect(mapStateToProps, mapDispatchToProps)(TopSongsComponent)
