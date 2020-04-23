import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

import firebase from '../firebase-config';


const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

function CreatePost({ user }) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [Title, setTitle] = React.useState('');
    const [Description, setDescription] = React.useState('');
    const [PostImg, setPostImg] = React.useState(null);


    const handleClickOpen = () => { 
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePost = () => {

        var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

        var month = months[new Date().getMonth()];
        var date = new Date().getDate();
        var year = new Date().getFullYear();

        var createdDate = `${month} ${date},${year}`
        firebase.AddPost(user.displayName, Title, PostImg, Description, createdDate );
        setOpen(false);
    };


    return (
        <div>

            <Tooltip title="Add Post" aria-label="add">
                <Fab color="secondary" className={classes.absolute} onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="title"
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                value={Title}
                                autoFocus
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={6}
                                defaultValue={Description}
                                variant="outlined"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                            >Upload Photo
                              <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(event) => setPostImg(URL.createObjectURL(event.target.files[0]))}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handlePost} color="primary">
                        Post
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(CreatePost);