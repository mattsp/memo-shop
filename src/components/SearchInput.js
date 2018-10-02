import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        width: '100%'
    }
})
class SearchInput extends Component {
    handleClearButtonClick = event => {}

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.grow}>
                <Toolbar disableGutters>
                    <Input
                        placeholder="Search…"
                        disableUnderline
                        autoFocus
                        classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}/>
                    <IconButton
                        onClick={this.handleClearButtonClick}
                        color="inherit"
                        aria-label="Clear">
                        <ClearIcon/>
                    </IconButton>
                </Toolbar>
            </div>
        );
    }
}

export default withStyles(styles)(SearchInput);