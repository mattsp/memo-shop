import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    display: 'flex'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 128
  }
})
const EmptyState = ({ classes, primaryTitle, secondaryTitle }) => {
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <AddShoppingCartIcon className={classes.icon} />
        <Typography color="textPrimary" variant="title" align="center">
          {primaryTitle}
        </Typography>
        <Typography color="textSecondary" variant="subheading" align="center">
          {secondaryTitle}
        </Typography>
      </Grid>
    </div>
  )
}

EmptyState.propTypes = {
  image: PropTypes.element.isRequired,
  primaryTitle: PropTypes.string.isRequired,
  secondaryTitle: PropTypes.string.isRequired
}
EmptyState.defaultProps = {
  primaryTitle: 'No Items',
  secondaryTitle: 'Add new Items and it will show up here'
}

export default withStyles(styles)(EmptyState)
