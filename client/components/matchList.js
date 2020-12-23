import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches, fetchDeleteMatch} from '../store/matches'
import Button from 'react-bootstrap/Button'
import {FileX} from 'react-bootstrap-icons'
import {Container, Row, Col, OverlayTrigger, Tooltip} from 'react-bootstrap'

export class MatchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    this.props.fetchDeleteMatch(id)
    this.props.fetchMatches()
  }

  componentDidMount() {
    this.props.fetchMatches()
    this.setState({isLoading: false})
  }

  render() {
    if (this.state.isLoading) {
      return <div>LOADING</div>
    }
    let approvedMatches = this.props.matches.approvedMatches
    let matchedMeUnapproved = this.props.matches.matchedMeUnapproved
    let myMatchesUnapproved = this.props.matches.myMatchesUnapproved

    return (
      <Container>
        <div id="matches-box">
          {approvedMatches &&
            approvedMatches.length > 0 &&
            approvedMatches.map(match => {
              return (
                <Row key={match.id} className="match-card">
                  <Col xs={12} md={{span: 2, offset: 1}}>
                    <img src={match.images[0]} className="match-image" />
                  </Col>
                  <Col s={12} md={{span: 2}} className="match-details-box">
                    <div>
                      <Button
                        id="matchSongsButton"
                        variant="outline-info"
                        className="matchButton"
                        as="a"
                        href={`/matches/${match.id}`}
                      >
                        {match.spotifyId}
                      </Button>
                    </div>
                    <div>
                      <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip id="tooltip-right">Unmatch</Tooltip>}
                      >
                        <Button
                          id="deleteMatchButton"
                          variant="outline-info"
                          className="matchButton"
                          onClick={() => this.handleClick(match.id)}
                        >
                          <FileX />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Col>
                </Row>
              )
            })}
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  matches: state.matches,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchMatches: () => dispatch(fetchMatches()),
  fetchDeleteMatch: id => dispatch(fetchDeleteMatch(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchList)
