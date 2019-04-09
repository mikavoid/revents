import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'

import SignedOutMenu from '../Menus/SignedOutMenu'
import SignedInMenu from '../Menus/SignedInMenu'

type Props = {
  history: any
}

type State = {
  authed: boolean
}

class NavBar extends Component<Props, State> {
  state = {
    authed: false
  }

  handleSignIn = () => {
    this.setState({
      authed: true
    })
  }

  handleSignOut = () => {
    this.setState({
      authed: false
    })
    this.props.history.push('/')
  }

  render() {
    const { authed } = this.state
    return (
      <>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header as={Link} to="/">
              <img src="assets/logo.png" alt="logo" />
              Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events" name="Events" />
            <Menu.Item as={NavLink} to="/test" name="Test" />
            {authed && (
              <>
                <Menu.Item as={NavLink} to="/people" name="People" />
                <Menu.Item>
                  <Button as={Link} to="/createEvent" floated="right" positive inverted content="Create Event" />
                </Menu.Item>
              </>
            )}
            {authed ? <SignedInMenu handleSignOut={this.handleSignOut} /> : <SignedOutMenu handleSignIn={this.handleSignIn} />}
          </Container>
        </Menu>
      </>
    )
  }
}

export default withRouter(NavBar)
