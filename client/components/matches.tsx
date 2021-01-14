import React from 'react'
import {connect} from 'react-redux'
import AddMatchForm from './addMatchForm'
import MatchApproval from './matchApproval'
import MatchList from './matchList'
import {Container, Tab, Nav} from 'react-bootstrap'
import { AppState, Matches, User } from '../types';



export type MatchesProps = {
  matches: Matches;
  user: User;
}

export type MatchesState = {
  isLoading: boolean;
}

export class MatchesComponent extends React.Component<MatchesProps, MatchesState> {
  constructor(props: MatchesProps) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({isLoading: false})
  }

  render() {
    if (this.state.isLoading) {
      return <div>LOADING</div>
    }

    return (
      <Container fluid id="match-file">
        <Tab.Container defaultActiveKey="first" id="match-page">
          <Nav variant="pills" className="match-nav">
            <Nav.Item className="first-match-link">
              <Nav.Link eventKey="first">Matches</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Requests</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Find Matches</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="first">
              <MatchList />
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

const mapStateToProps = (state: AppState) => ({
  matches: state.matches,
  user: state.user
})


export default connect(mapStateToProps)(MatchesComponent)
