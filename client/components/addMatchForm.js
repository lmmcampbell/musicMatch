import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches, addMatch} from '../store/matches'
import {Form} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {Row, Container, Col} from 'react-bootstrap'

class addMatchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matchName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addMatch({
      ...this.state
    })
    this.setState({
      matchName: ''
    })
    this.props.fetchMatches()
  }

  render() {
    return (
      // <div id="add-match-form">
      <Container fluid>
        <Form onSubmit={this.handleSubmit} className="matchForm">
          <Form.Group controlId="formMatchName">
            <Form.Control
              type="text"
              name="matchName"
              value={this.state.matchName}
              onChange={this.handleChange}
              placeholder="Search for Spotify ID"
            />
          </Form.Group>

          <Button type="submit" variant="outline-info" id="add-button">
            Add Match{' '}
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMatches: () => dispatch(fetchMatches()),
    addMatch: product => dispatch(addMatch(product))
  }
}

export default connect(null, mapDispatchToProps)(addMatchForm)
