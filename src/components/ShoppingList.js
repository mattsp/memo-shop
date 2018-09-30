import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import AddIcon from '@material-ui/icons/Add'
import MoreIcon from '@material-ui/icons/MoreVert'
import CheckIcon from '@material-ui/icons/Check'
import Gesture from 'rc-gesture'
import { isMobile } from 'react-device-detect'
import EmptyState from './EmptyState'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  selectedAvatar: {
    backgroundColor: theme.palette.secondary.light
  },
  listItemText: {
    userSelect: 'none'
  },
  addFab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
})

class ShoppingList extends Component {
  handleListItemClick = (event, id) => {
    this.props.onItemSelected(event, id)
  }

  render() {
    const { classes, items, selectedItems } = this.props
    const isEmpty = items.length === 0
    return (
      <div className={classes.root}>
        <List>
          {items.map(item => (
            <Gesture
              key={item.id}
              onPressUp={gestureStatus => {
                this.handleListItemClick(gestureStatus, item.id)
              }}
            >
              <ListItem
                button={!isMobile}
                selected={selectedItems.includes(item.id)}
                onClick={event => {
                  if (!isMobile) this.handleListItemClick(event, item.id)
                  else {
                    event.preventDefault()
                    event.stopPropagation()
                    return false
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    className={
                      selectedItems.includes(item.id)
                        ? classes.selectedAvatar
                        : undefined
                    }
                  >
                    {selectedItems.includes(item.id) ? (
                      <CheckIcon />
                    ) : (
                      <ShoppingBasketIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary={item.name}
                  secondary={item.creationDate}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="More">
                    <MoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Gesture>
          ))}
        </List>
        {isEmpty && (
          <EmptyState
            primaryTitle="Empty in Shopping"
            secondaryTitle="Add new Shopping and it will show up here"
          />
        )}
        <Button className={classes.addFab} variant="fab" color="secondary">
          <AddIcon />
        </Button>
      </div>
    )
  }
}

ShoppingList.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string.isRequired),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      creationDate: PropTypes.string.isRequired,
      cost: PropTypes.string.isRequired
    })
  ),
  onItemSelected: PropTypes.func
}

ShoppingList.defaultProps = {
  selectedItems: [],
  items: [],
  onItemSelected: () => {}
}

export default withStyles(styles)(ShoppingList)
