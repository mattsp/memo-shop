import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'

const styles = theme => ({
  grow: {
    flexGrow: 1
  }
})

class TopBar extends Component {
  handleLeftButtonClick = event => {
    this
      .props
      .onClickLeftButton(event)
  }
  render() {
    const {
      classes,
      color,
      navigationIconRenderer,
      pageTitle,
      actionsItemsRenderer,
      overflowMenuRenderer,
      contentRenderer
    } = this.props
    return (
      <Fragment>
        <AppBar color={color} position="absolute">
          <Toolbar disableGutters>
            <IconButton
              onClick={this.handleLeftButtonClick}
              color="inherit"
              aria-label="Menu">
              {navigationIconRenderer()}
            </IconButton>
            {contentRenderer({classes, pageTitle})}
            {actionsItemsRenderer(classes)}
          </Toolbar>
        </AppBar>
        <Menu
          anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
          transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
          open={false}
          onClose={this.handleMenuClose}>
          {overflowMenuRenderer(classes)}
        </Menu>
      </Fragment>
    )
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  navigationIconRenderer: PropTypes.func,
  pageTitle: PropTypes.string,
  actionsItemsRenderer: PropTypes.func,
  overflowMenuRenderer: PropTypes.func,
  onClickLeftButton: PropTypes.func,
  contentRenderer: PropTypes.func
}

TopBar.defaultProps = {
  color: 'primary',
  navigationIconRenderer: () => <MenuIcon/>,
  pageTitle: '',
  actionsItemsRenderer: () => {},
  overflowMenuRenderer: () => [],
  onClickLeftButton: () => {},
  contentRenderer: () => {}
}

export default withStyles(styles)(TopBar)
