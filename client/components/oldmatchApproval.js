import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches, fetchApproveMatch} from '../store/matches'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import {Row, Container, Col} from 'react-bootstrap'

export class MatchApproval extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    this.props.fetchApproveMatch(id)
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
    let matchedMeUnapprovedRows = this.props.matches.matchedMeUnapprovedRows
    return (
      <Container className="match-approval">
        <div id="matches-box">
          {matchedMeUnapprovedRows && matchedMeUnapprovedRows.length > 0 ? (
            matchedMeUnapprovedRows.map(match => {
              const match1 = match[0]
              const match2 = match[1]
              return (
                <Row key={match1.id} className="match-card">
                  <Col xs={12} md={{span: 2}}>
                    <img src={match1.images[0]} className="match-image" />
                  </Col>
                  <Col s={12} md={{span: 2}}>
                    {match1.spotifyId}
                  </Col>
                  <Col s={12} md={{span: 2}}>
                    <Button
                      id="approveMatchButton"
                      variant="info"
                      className="matchButton"
                      onClick={() => this.handleClick(match1.id)}
                    >
                      Approve
                    </Button>
                  </Col>
                  {match2 && (
                    <>
                      <Col xs={12} md={{span: 2}}>
                        <img src={match2.images[0]} className="match-image" />
                      </Col>
                      <Col s={12} md={{span: 2}}>
                        {match2.spotifyId}
                      </Col>
                      <Col s={12} md={{span: 2}}>
                        <Button
                          id="approveMatchButton"
                          variant="info"
                          className="matchButton"
                          onClick={() => this.handleClick(match2.id)}
                        >
                          Approve
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              )
            })
          ) : (
            <Row className="match-approval-row">
              <Col>No match requests waiting for approval!</Col>
            </Row>
          )}
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
  fetchApproveMatch: id => dispatch(fetchApproveMatch(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchApproval)
