import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
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
import {isMobile} from 'react-device-detect'
import EmptyState from './EmptyState'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

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
  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
      shoppingName: undefined
    }
  }
  handleListItemClick = (event, id) => {
    this
      .props
      .onItemSelected(event, id)
  }

  handleButtonAddClick = event => {
    this.setState({dialogOpen: true})
  }

  handleDialogClose = event => {
    this.setState({dialogOpen: false})
  }

  handleShoppingNameChange = event => {
    this.setState({shoppingName: event.target.value})
  }

  handleDialogCancel = event => {
    this.handleDialogClose(event);
  }

  handleDialogSave = event => {
    this
      .props
      .onItemCreated(event, this.state.shoppingName);
    this.handleDialogClose(event);
  }

  render() {
    const {classes, items, selectedItems} = this.props
    const {shoppingName} = this.state
    const isEmpty = items.length === 0
    return (
      <div className={classes.root}>
        <List>
          {items.map(item => (
            <Gesture
              key={item.id}
              onPressUp={gestureStatus => {
              this.handleListItemClick(gestureStatus, item.id)
            }}>
              <ListItem
                button={!isMobile}
                selected={selectedItems.includes(item.id)}
                onClick={event => {
                if (!isMobile) {
                  this.handleListItemClick(event, item.id)
                } else {
                  event.preventDefault();
                  event.stopPropagation();
                  return false
                }
              }}>
                <ListItemAvatar>
                  <Avatar
                    className={selectedItems.includes(item.id)
                    ? classes.selectedAvatar
                    : undefined}>
                    {selectedItems.includes(item.id)
                      ? (<CheckIcon/>)
                      : (<ShoppingBasketIcon/>)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary={item.name}
                  secondary={item
                  .creationDate
                  .fromNow()}/>
                <ListItemSecondaryAction>
                  <IconButton aria-label="More">
                    <MoreIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Gesture>
          ))}
        </List>
        {isEmpty && (<EmptyState
          primaryTitle="Empty in Shopping"
          secondaryTitle="Add new Shopping and it will show up here"/>)}
        <Button
          className={classes.addFab}
          variant="fab"
          color="secondary"
          onClick={this.handleButtonAddClick}>
          <AddIcon/>
        </Button>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Shopping name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the name of the Shopping item
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="text"
              onChange={this.handleShoppingNameChange}
              fullWidth/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogCancel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleDialogSave}
              color="primary"
              disabled={!shoppingName}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ShoppingList.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string.isRequired),
  items: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.string.isRequired, name: PropTypes.string.isRequired, creationDate: PropTypes.object, cost: PropTypes.number.isRequired})),
  onItemSelected: PropTypes.func,
  onItemCreated: PropTypes.func
}

ShoppingList.defaultProps = {
  selectedItems: [],
  items: [],
  onItemSelected: () => {},
  onItemCreated: () => {}
}

export default withStyles(styles)(ShoppingList)
