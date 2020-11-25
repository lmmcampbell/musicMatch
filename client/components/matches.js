import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches} from '../store/matches'
import AddMatchForm from './addMatchForm'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

export class Matches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.fetchMatches()
    this.setState({isLoading: false})
  }

  render() {
    if (this.state.isLoading) {
      return <div>LOADING</div>
    }
    let matches = this.props.matches

    return (
      <div className="match-page">
        <h2 className="title">Current Matches</h2>
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
              {matches && matches.length ? (
                matches.map(match => {
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
                          className="deleteMatchButton"
                        >
                          Deactivate Match
                        </Button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>No matches yet!</tr>
              )}
            </tbody>
          </Table>
        </div>
        <AddMatchForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  matches: state.matches,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchMatches: () => dispatch(fetchMatches())
})

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
