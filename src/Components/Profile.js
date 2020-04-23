import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import firebase from '../firebase-config';
import { withRouter } from 'react-router-dom'



const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop: '20px'
    },
    media: {
        height: 140,
    },
});

function Profile({ history }) {
    const classes = useStyles();
    var user = firebase.auth.currentUser ? firebase.auth.currentUser : 'User'; //currently logged in user...

    const [open, setOpen] = React.useState(false);
    const [opend2, setOpend2] = React.useState(false);

    const [dname, setdname] = useState(user.displayName)//its by default shows firstname and lastname
    const [photourl, setphotourl] = useState(user.photoURL);//its take by default photo url..


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpend2 = () => {
        setOpend2(true);
    };//Dialogbox 2(delete)

    const handelchange = (event) => {
        setphotourl(URL.createObjectURL(event.target.files[0]))
    }//This is for get the image for photourl


    const handleSave = () => {
        user.updateProfile({
            displayName: dname,
            photoURL: photourl
        })//updated the displayname and photourl on save button..
        setOpen(false);
        console.log(user);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClosed2 = () => {
        setOpend2(false);
    };//Dialogbox 2(delete)

    const handledelete = () => {
        var childId;
        firebase.db.ref('users').once("value").then((snap) => {
            Object.keys(snap.val())
                .filter(key => snap.val()[key].email === user.email)
                .map((i) => {
                    childId = i;
                })
        })
        user.delete().then(function () {
            firebase.deleteuser(childId);//Its call deleteuser function from firebase config file.
            history.push('/');
        }).catch(function (error) {
            console.log(error);
        });
    };//Dialogbox 2(delete)


    const [Followers, setFollowers] = useState(0);

    //get all the users from collection and filter email of currently logged in user and get the number of followers except lgged user from list...
    firebase.db.ref('users').once("value").then((snap) => {
        const filtered = Object.keys(snap.val())
            .filter(key => snap.val()[key].email !== user.email)
            .map((i) => {
                return i;
            })

        setFollowers(filtered.length);
    })

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={photourl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {dname}
                        {/* shows display name above */}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>

                <Button size="small" color="primary">
                    FOLLOWERS
                    <p>({Followers})</p>
                </Button>
                <Button size="small" color="primary" onClick={handleClickOpen}>
                    EDIT<EditIcon />
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To update display name and profile photo enter display name and upload photo here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="displayname"
                            label="Display Name"
                            type="text"
                            fullWidth
                            value={dname}
                            onChange={(event) => setdname(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            component="label"
                        >Upload Photo
                        <input
                                type="file"
                                onChange={(event) => handelchange(event)}
                                style={{ display: "none" }}
                            />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button size="small" color="primary" onClick={handleClickOpend2}>
                    DELETE<DeleteIcon />
                </Button>
                <Dialog
                    open={opend2}
                    keepMounted
                    onClose={handleClosed2}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Are you sure?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure? you want to delete this account?
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosed2} color="primary">
                            Cancel
          </Button>
                        <Button onClick={handledelete} color="primary">
                            Delete
          </Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    );
}

export default withRouter(Profile);