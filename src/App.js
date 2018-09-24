import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import TopBar from './components/TopBar'
import './App.scss'

const styles = {
  root: {
    flexGrow: 1
  }
}
class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <TopBar />
        </div>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
