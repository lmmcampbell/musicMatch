import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches, fetchDeleteMatch} from '../store/matches'
import Button from 'react-bootstrap/Button'
import {FileX, Trash} from 'react-bootstrap-icons'
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
    let approvedMatchesRows = this.props.matches.approvedMatchesRows

    return (
      <Container>
        <div id="matches-box">
          {approvedMatchesRows &&
            approvedMatchesRows.length > 0 &&
            approvedMatchesRows.map(match => {
              const match1 = match[0]
              const match2 = match[1]
              return (
                <Row key={match1.id} className="match-card">
                  <Col xs={12} md={{span: 2}}>
                    <img src={match1.images[0]} className="match-image" />
                  </Col>
                  <Col s={12} md={{span: 3}} className="match-details-box">
                    <div>
                      <Button
                        id="matchSongsButton"
                        variant="info"
                        className="matchButton"
                        as="a"
                        href={`/matches/${match1.id}`}
                      >
                        {match1.spotifyId}
                      </Button>
                    </div>
                    <div>
                      <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip id="tooltip-right">Unmatch</Tooltip>}
                      >
                        <Button
                          id="deleteMatchButton"
                          variant="info"
                          className="matchButton"
                          onClick={() => this.handleClick(match1.id)}
                        >
                          <Trash />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Col>
                  {match2 && (
                    <>
                      <Col xs={12} md={{span: 2, offset: 1}}>
                        <img src={match2.images[0]} className="match-image" />
                      </Col>
                      <Col s={12} md={{span: 3}} className="match-details-box">
                        <div>
                          <Button
                            id="matchSongsButton"
                            variant="info"
                            className="matchButton"
                            as="a"
                            href={`/matches/${match2.id}`}
                          >
                            {match2.spotifyId}
                          </Button>
                        </div>
                        <div>
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">Unmatch</Tooltip>
                            }
                          >
                            <Button
                              id="deleteMatchButton"
                              variant="info"
                              className="matchButton"
                              onClick={() => this.handleClick(match2.id)}
                            >
                              <Trash />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </Col>
                    </>
                  )}
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
