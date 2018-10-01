import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import moment from 'moment'
import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import TopBar from './components/TopBar'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ClearIcon from '@material-ui/icons/Clear'
import './App.scss'
import ShoppingList from './components/ShoppingList'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  appBarSpacer: theme.mixins.toolbar
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItems: [],
      shoppingItems: [
        // {   id: '1',   name: 'course 1',   creationDate: '10/10/2018',   cost: '10
        // Euros' }, {   id: '2',   name: 'course 2',   creationDate: '10/10/2018',
        // cost: '10 Euros' }, {   id: '3',   name: 'course 3',   creationDate:
        // '10/10/2018',   cost: '10 Euros' }, {   id: '4',   name: 'course 4',
        // creationDate: '10/10/2018',   cost: '10 Euros' }, {   id: '5',   name:
        // 'course 5',   creationDate: '10/10/2018',   cost: '10 Euros' }
      ],
      pageTitle: 'Shopping'
    }
  }

  renderNavigationIcon = () => {
    if (this.state.selectedItems.length > 0) {
      return <ClearIcon/>
    }
    return <MenuIcon/>
  }

  renderTitle = () => {
    if (this.state.selectedItems.length > 0) {
      return `${this.state.selectedItems.length} Selected`
    }
    return 'Shopping list'
  }

  renderActionsItems = () => {
    if (this.state.selectedItems.length > 0) {
      return (
        <IconButton
          color="inherit"
          aria-label="Delete"
          onClick={this.handleDeleteAction}>
          <Delete/>
        </IconButton>
      )
    }
  }

  renderShoppingList = props => {
    return (<ShoppingList
      {...props}
      items={this.state.shoppingItems}
      selectedItems={this.state.selectedItems}
      onItemSelected={this.handleItemSelected}
      onItemCreated={this.handleItemCreated}/>)
  }

  handleItemSelected = (event, id) => {
    if (!this.state.selectedItems.includes(id)) 
      this.setState({
        selectedItems: [
          ...this.state.selectedItems,
          id
        ]
      })
    else 
      this.setState({
        selectedItems: this
          .state
          .selectedItems
          .filter(selectedItem => selectedItem !== id)
      })
  }

  handleItemCreated = (event, name) => {
    this.setState({
      shoppingItems: [
        ...this.state.shoppingItems,
        ...[
          {
            id: Math.floor((Math.random() * 1000000) + 1).toString(),
            name,
            creationDate: moment(),
            cost: 0
          }
        ]
      ]
    })
  }

  handleLeftButtonClick = event => {
    if (this.state.selectedItems.length > 0) {
      this.setState({selectedItems: []})
    }
  }

  handleDeleteAction = event => {
    this.setState({
      shoppingItems: this
        .state
        .shoppingItems
        .filter(shoppingItem => !this.state.selectedItems.includes(shoppingItem.id)),
      selectedItems: []
    })
  }

  render() {
    const {classes} = this.props
    const isMultiSelection = this.state.selectedItems.length > 0
    return (
      <React.Fragment>
        <CssBaseline/>
        <div className={classes.root}>
          <TopBar
            color={isMultiSelection
            ? 'secondary'
            : undefined}
            onClickLeftButton={this.handleLeftButtonClick}
            navigationIconRenderer={this.renderNavigationIcon}
            pageTitle={this.renderTitle()}
            actionsItemsRenderer={this.renderActionsItems}/>
          <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Router>
              <Route path="/" render={this.renderShoppingList}/>
            </Router>
          </main>
        </div>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)