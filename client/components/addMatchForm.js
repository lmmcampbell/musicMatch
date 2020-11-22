import React from 'react'
import {connect} from 'react-redux'
import {addMatch} from '../store/matches'
import {Form} from 'react-bootstrap'
// import NewProductConfirmation from './NewProductConfirmation'

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
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="matchForm">
          <h4>Approve a Match:</h4>
          <Form.Group controlId="formMatchName">
            <Form.Control
              type="text"
              name="matchName"
              value={this.state.matchName}
              onChange={this.handleChange}
              placeholder="Match's Spotify ID"
            />
          </Form.Group>
          <button type="submit">Add Match</button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMatch: product => dispatch(addMatch(product))
  }
}

export default connect(null, mapDispatchToProps)(addMatchForm)
