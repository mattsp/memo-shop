import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {uniqBy} from 'lodash'
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
import SearchInput from './components/SearchInput';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography'

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
      filterShoppingItems: [],
      initialShoppingItems: [],
      shoppingItems: [
        // {   id: '1',   name: 'course 1',   creationDate: '10/10/2018',   cost: '10
        // Euros' }, {   id: '2',   name: 'course 2',   creationDate: '10/10/2018',
        // cost: '10 Euros' }, {   id: '3',   name: 'course 3',   creationDate:
        // '10/10/2018',   cost: '10 Euros' }, {   id: '4',   name: 'course 4',
        // creationDate: '10/10/2018',   cost: '10 Euros' }, {   id: '5',   name:
        // 'course 5',   creationDate: '10/10/2018',   cost: '10 Euros' }
      ],
      pageTitle: 'Shopping',
      showSearchInput: false,
      searchValue: ''
    }
  }

  renderNavigationIcon = () => {
    if (this.state.selectedItems.length > 0) {
      return <ClearIcon/>
    } else if (this.state.showSearchInput) {
      return <ArrowBack/>
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
    } else if (!this.state.showSearchInput) {
      return (
        <IconButton
          color="inherit"
          aria-label="Search"
          onClick={this.handleSearchAction}>
          <SearchIcon/>
        </IconButton>
      )
    }
  }

  renderShoppingList = props => {
    return (<ShoppingList
      {...props}
      items={this
      .state
      .shoppingItems
      .filter(shoppingItem => shoppingItem.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 || this.state.searchValue === '')}
      selectedItems={this.state.selectedItems}
      showAddButton={!this.state.showSearchInput}
      onItemSelected={this.handleItemSelected}
      onItemCreated={this.handleItemCreated}
      onItemDelete={this.handleItemDelete}
      onItemEdit={this.handleItemEdit}/>)
  }

  renderContent = ({classes, pageTitle}) => {
    if (this.state.showSearchInput) {
      return (
        <SearchInput onChange={this.handleSearchChange} value={this.state.searchValue}></SearchInput>
      )
    }
    return <Typography variant="title" color="inherit" className={classes.grow}>
      {pageTitle}
    </Typography>
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
    const items = [
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
    this.setState({shoppingItems: items})
  }

  handleItemDelete = (event, id) => {
    this.setState({
      shoppingItems: this
        .state
        .shoppingItems
        .filter((shoppingItem) => shoppingItem.id !== id),
      selectedItems: []
    })
  }

  handleItemEdit = (event, id, name) => {
    const updateItem = {
      ...this
        .state
        .shoppingItems
        .filter(item => item.id === id),
      name
    };
    this.setState({
      shoppingItems: this
        .state
        .shoppingItems
        .map((item) => {
          if (item.id !== id) {
            return item;
          }
          return {
            ...item,
            ...updateItem
          };
        })
    })
  }

  handleLeftButtonClick = event => {
    if (this.state.selectedItems.length > 0) {
      this.setState({selectedItems: []})
    } else if (this.state.showSearchInput) {
      const mergedItems = uniqBy([
        ...this.state.shoppingItems,
        ...this
          .state
          .initialShoppingItems
          .filter(initialItem => this.state.shoppingItems.find(item => item.id === initialItem.id))
      ], 'id')
      this.setState({showSearchInput: false, searchValue: '', shoppingItems: mergedItems})
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

  handleSearchAction = event => {
    this.setState({
      showSearchInput: true,
      initialShoppingItems: this
        .state
        .shoppingItems
        .concat()
    })
  }

  handleSearchChange = event => {
    this.setState({searchValue: event.target.value})
  }

  render() {
    const {classes} = this.props
    const isMultiSelection = this.state.selectedItems.length > 0
    const isSearch = this.state.showSearchInput
      ? 'default'
      : 'primary'
    const appBarColor = isMultiSelection
      ? 'secondary'
      : isSearch
    return (
      <React.Fragment>
        <CssBaseline/>
        <div className={classes.root}>
          <TopBar
            color={appBarColor}
            onClickLeftButton={this.handleLeftButtonClick}
            navigationIconRenderer={this.renderNavigationIcon}
            pageTitle={this.renderTitle()}
            actionsItemsRenderer={this.renderActionsItems}
            contentRenderer={this.renderContent}/>
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