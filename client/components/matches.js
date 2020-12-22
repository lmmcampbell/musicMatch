import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches, fetchDeleteMatch} from '../store/matches'
import AddMatchForm from './addMatchForm'
import MatchApproval from './matchApproval'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import {Container, Row, Col, Tab, Nav, Navbar} from 'react-bootstrap'

export class Matches extends React.Component {
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
      <Container fluid id="match-file">
        <Tab.Container defaultActiveKey="first" id="match-page">
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="first">Matches</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Match Requests</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Find Matches</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div id="table-box">
                <Table striped bordered hover id="match-table">
                  <thead>
                    <tr>
                      <th>Spotify ID</th>
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {approvedMatches &&
                      approvedMatches.length > 0 &&
                      approvedMatches.map(match => {
                        return (
                          <tr key={match.id}>
                            <td>{match.spotifyId}</td>
                            <td>
                              <Button
                                id="matchSongsButton"
                                variant="outline-info"
                                className="matchButton"
                                as="a"
                                href={`/matches/${match.id}`}
                              >
                                View Match
                              </Button>
                            </td>
                            <td>
                              <Button
                                id="deleteMatchButton"
                                variant="outline-info"
                                className="matchButton"
                                onClick={() => this.handleClick(match.id)}
                              >
                                Deactivate Match
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <MatchApproval />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <AddMatchForm />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
