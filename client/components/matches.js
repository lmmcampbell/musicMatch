import React from 'react'
import {connect} from 'react-redux'
import {fetchMatches, fetchDeleteMatch} from '../store/matches'
import AddMatchForm from './addMatchForm'
import MatchApproval from './matchApproval'
import MatchList from './matchList'
import {Container, Row, Col, Tab, Nav} from 'react-bootstrap'

export class Matches extends React.Component {
  constructor(props) {
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
      <Container id="match-file">
        <Tab.Container defaultActiveKey="first" id="match-page">
          <Nav className="match-nav">
            <Nav.Item>
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

const mapStateToProps = state => ({
  matches: state.matches,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchMatches: () => dispatch(fetchMatches()),
  fetchDeleteMatch: id => dispatch(fetchDeleteMatch(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
