import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Switch, Route, Redirect } from 'react-router-dom'

import SettingsNav from './SettingsNav'
import BasicPage from './BasicPage'
import PhotosPage from './PhotosPage'
import AboutPage from './AboutPage'
import AccountPage from './AccountPage'

class SettingsDashboard extends Component<{}> {
  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <Switch>
            <Redirect exact from="/settings" to="/settings/basics" />
            <Route path="/settings/basics" component={BasicPage} />
            <Route path="/settings/about" component={AboutPage} />
            <Route path="/settings/photos" component={PhotosPage} />
            <Route path="/settings/account" component={AccountPage} />
          </Switch>
        </Grid.Column>
        <SettingsNav />
      </Grid>
    )
  }
}

export default SettingsDashboard
