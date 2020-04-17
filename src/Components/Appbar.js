import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    icon: {
        marginBottom: '2px'
    }
}));

function Appbar({ history }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Mansi Joshi
          </Typography>
                    <Button color="inherit" onClick={() => history.push('/signup')}>Sign Up</Button>
                    <Button color="inherit" onClick={() => history.push('/signin')} > Sign In</Button>
                    <Button color="inherit"><AccountCircle className={classes.icon} /></Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Appbar);