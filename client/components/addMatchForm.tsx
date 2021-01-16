import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches, addMatch} from '../store/matches'
import {Form, Row, Container, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../types';

export type AddMatchFormProps = {
  fetchMatches: () => undefined;
  addMatch: (name: string) => undefined;
};

export type AddMatchFormState = {
  matchName: string;
}

class AddMatchForm extends React.Component<AddMatchFormProps, AddMatchFormState>  {
  constructor(props: AddMatchFormProps) {
    super(props)
    this.state = {
      matchName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      matchName: evt.target.value
    })
  }
  handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
 
    this.props.addMatch(this.state.matchName)
    this.setState({
      matchName: ''
    })

    this.props.fetchMatches()
  }

  render() {
    return (
      // <div id="add-match-form">
      <Container fluid>
        <Row className="add-match">
          <Col xs={12} md={{span: 5, offset: 3}}>
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

              <Button type="submit" variant="info">
                Add Match{' '}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, any>) => {
  return {
    fetchMatches: () => dispatch(fetchMatches()),
    addMatch: (name: string) => dispatch(addMatch(name))
  }
}

export default connect(null, mapDispatchToProps)(AddMatchForm)
