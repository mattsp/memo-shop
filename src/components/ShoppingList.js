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
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Gesture from 'rc-gesture'
import {isMobile} from 'react-device-detect'
import EmptyState from './EmptyState'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

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
      shoppingName: '',
      anchorMenuEl: null,
      currentItemId: undefined
    }
  }
  handleListItemClick = (event, id) => {
    this
      .props
      .onItemSelected(event, id)
  }

  handleButtonAddClick = event => {
    this.setState({dialogOpen: true, currentItemId: undefined, shoppingName: ''})
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
    if (this.state.currentItemId !== undefined) {
      this
        .props
        .onItemEdit(event, this.state.currentItemId, this.state.shoppingName);
    } else {
      this
        .props
        .onItemCreated(event, this.state.shoppingName);
    }
    this.handleDialogClose(event);
  }

  handleClickItemMenu = (event, id) => {
    this.setState({
      anchorMenuEl: event.currentTarget,
      currentItemId: id,
      shoppingName: this
        .props
        .items
        .filter(item => item.id === id)[0]
        .name
    });
  };

  handleCloseItemMenu = (event, currentItemIndex, menuItemIndex) => {
    if (menuItemIndex === 0) {
      this.setState({anchorMenuEl: null, dialogOpen: true})
    } else if (menuItemIndex === 1) {
      this.setState({anchorMenuEl: null});
      this
        .props
        .onItemDelete(event, currentItemIndex);
    }
  };

  render() {
    const {classes, items, selectedItems, optionsItem, showAddButton} = this.props
    const {shoppingName, anchorMenuEl, currentItemId} = this.state
    const isEmpty = items.length === 0
    return (
      <div className={classes.root}>
        <List>
          {items.map((item, index) => (
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
                  <IconButton
                    aria-label="More"
                    onClick={(event) => this.handleClickItemMenu(event, item.id)}>
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
        {showAddButton && (
          <Button
            className={classes.addFab}
            variant="fab"
            color="secondary"
            onClick={this.handleButtonAddClick}>
            <AddIcon/>
          </Button>
        )}
        <Dialog
          fullScreen={isMobile}
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
              value={shoppingName}
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
        <Menu
          id="action-shoping-item-menu"
          anchorEl={anchorMenuEl}
          open={Boolean(anchorMenuEl)}
          onClose={this.handleCloseItemMenu}>
          {optionsItem.map((option, menuItemIndex) => (
            <MenuItem
              key={option.name}
              onClick={event => this.handleCloseItemMenu(event, currentItemId, menuItemIndex)}>
              <ListItemIcon>
                {option.icon}
              </ListItemIcon>
              <ListItemText inset primary={option.name}/>
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

ShoppingList.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string.isRequired),
  showAddButton: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.string.isRequired, name: PropTypes.string.isRequired, creationDate: PropTypes.object, cost: PropTypes.number.isRequired})),
  onItemSelected: PropTypes.func,
  onItemCreated: PropTypes.func,
  onItemDelete: PropTypes.func,
  onItemEdit: PropTypes.func
}

ShoppingList.defaultProps = {
  selectedItems: [],
  showAddButton: true,
  items: [],
  optionsItem: [
    {
      name: 'Edit',
      icon: <EditIcon></EditIcon>
    }, {
      name: 'Delete',
      icon: <DeleteIcon></DeleteIcon>
    }
  ],
  onItemSelected: () => {},
  onItemCreated: () => {},
  onItemDelete: () => {},
  onItemEdit: () => {}
}

export default withStyles(styles)(ShoppingList)
