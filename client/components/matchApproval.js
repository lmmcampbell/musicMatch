import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches, fetchApproveMatch} from '../store/matches'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

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
    let matchedMeUnapproved = this.props.matches.matchedMeUnapproved
    return (
      <div className="match-approval">
        <h2 className="title">Match Requests</h2>
        <div id="table-box">
          <Table striped bordered hover id="match-table">
            <thead>
              <tr>
                <th>Spotify ID</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {matchedMeUnapproved && matchedMeUnapproved.length > 0 ? (
                matchedMeUnapproved.map(match => {
                  return (
                    <tr key={match.id}>
                      <td>{match.spotifyId}</td>
                      <td>
                        <Button
                          id="approveMatchButton"
                          variant="outline-info"
                          className="matchButton"
                          onClick={() => this.handleClick(match.id)}
                        >
                          Approve
                        </Button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>No match requests waiting for approval!</tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
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
