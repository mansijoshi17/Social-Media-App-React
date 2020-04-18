import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { withRouter } from "react-router-dom";
import firebase from '../firebase-config';

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

    const [user, setuser] = useState(null);

    useEffect(() => {
        authListener();
    }, [])

    //This function is get that user is currently signed in or not....
    function authListener() {
        firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setuser(user);
            }
            else {
                setuser(user);
            }
        })
    }

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
                    {/* Bellow line check if user is signed in than show sign out option otherwise sign in option  */}
                    {user ? <Button color="inherit" onClick={() => firebase.auth.signOut()} > Sign Out</Button> : <Button color="inherit" onClick={() => history.push('/signin')}> Sign In</Button>}
                    {user ? <Button color="inherit" onClick={() => history.push('/profile')}><AccountCircle className={classes.icon} /></Button> : null}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Appbar);