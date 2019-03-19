import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

type Props = {
  handleSignIn: any => void
}

function SignedOutMenu({ handleSignIn }: Props) {
  return (
    <Menu.Item position="right">
      <Button basic inverted onClick={handleSignIn} content="Login" />
      <Button basic inverted onClick={handleSignIn} content="Register" style={{ marginLeft: '0.5em' }} />
    </Menu.Item>
  )
}

export default SignedOutMenu
