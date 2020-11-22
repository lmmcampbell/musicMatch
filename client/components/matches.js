import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches} from '../store/matches'
import AddMatchForm from './addMatchForm'
import Button from 'react-bootstrap/Button'

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
    console.log(matches)
    return (
      <div className="match-page">
        <h2>Your current matches are:</h2>
        {matches && matches.length ? (
          matches.map(match => {
            return (
              <div key={match.id}>
                {match.spotifyId}
                <Button
                  id="matchSongsButton"
                  variant="light"
                  className="matchButton"
                  as="a"
                  href={`/matches/${match.id}`}
                >
                  View Matches
                </Button>
              </div>
            )
          })
        ) : (
          <div>No matches yet!</div>
        )}
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
