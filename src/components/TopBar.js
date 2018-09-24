import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'

const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class TopBar extends Component {
  render() {
    const {
      classes,
      navigationIconRenderer,
      pageTitle,
      actionsItemsRenderer,
      overflowMenuRenderer
    } = this.props
    return (
      <Fragment>
        <AppBar position="absolute">
          <Toolbar>
            {navigationIconRenderer(classes)}
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              {pageTitle}
            </Typography>
            {actionsItemsRenderer(classes)}
            <IconButton
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {overflowMenuRenderer(classes)}
      </Fragment>
    )
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  navigationIconRenderer: PropTypes.func,
  pageTitle: PropTypes.string,
  actionsItemsRenderer: PropTypes.func,
  overflowMenuRenderer: PropTypes.func
}

TopBar.defaultProps = {
  navigationIconRenderer: classes => (
    <IconButton
      className={classes.menuButton}
      color="inherit"
      aria-label="Menu"
    >
      <MenuIcon />
    </IconButton>
  ),
  pageTitle: '',
  actionsItemsRenderer: classes => <Button color="inherit">Login</Button>,
  overflowMenuRenderer: classes => (
    <Menu
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={false}
      onClose={this.handleMenuClose}
    >
      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
      <MenuItem onClick={this.handleClose}>My account</MenuItem>
    </Menu>
  )
}

export default withStyles(styles)(TopBar)
