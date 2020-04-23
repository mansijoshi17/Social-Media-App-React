import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';

import firebase from '../firebase-config';
import CommentList from './CommentList';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: '20px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


function PostList({ user }) {

  const [posts, setposts] = useState([]);
  const [Comment, setComment] = useState('');
  const [Likes, setLikes] = useState(0);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    getpost();
    console.log(user)
  }, [])

  function getpost() {
    firebase.db.ref('posts').once("value").then((snap) => {
      const posts = Object.keys(snap.val()).map(function (key, index) {
        return snap.val()[key];
      });
      setposts(posts);
    })
  }

  const classes = useStyles();

  const handleComment = (id) => {
    firebase.db.ref('posts').once("value").then((snap) => {
      Object.keys(snap.val())
        .filter(key => snap.val()[key].id === id)
        .map((i) => {
          firebase.AddComments(i, Comment, user.displayName, user.photoURL);
        })
    })
  };

  const handleLikes = (id) => {
    firebase.db.ref('posts').once("value").then((snap) => {
      Object.keys(snap.val())
        .filter(key => snap.val()[key].id === id)
        .map((i) => {
          firebase.AddLikes(i, 'like');
        })
    })//Add Likes
  }

  const handleshowlikes = (id) => {
    firebase.db.ref('posts').once("value").then((snap) => {
      Object.keys(snap.val())
        .filter(key => snap.val()[key].id === id)
        .map((i) => {
          return Object.keys(snap.val()[i].Likes).length ? setLikes(Object.keys(snap.val()[i].Likes).length) : '0';//Finded length of likes object.
        })
    })//Get likes from firebase database on hover of like icon.
  }

  const handledeletepost = (id) => {
    firebase.db.ref('posts').once("value").then((snap) => {
      Object.keys(snap.val())
        .filter(key => snap.val()[key].id === id)
        .map((i) => {
          firebase.deletepost(i);
        })
    })
  }



  return (
    <div>
      {posts.map((post, index) => {

        return <Card className={classes.root} key={post.id}  >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {post.displayName.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton onClick={() => handledeletepost(post.id)}>
                <DeleteIcon />
              </IconButton>

            }
            title={post.displayName}
            subheader={post.createdAt}
          />

          <CardMedia
            className={classes.media}
            image={post.photourl}
            title="img"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <h3>{post.title}</h3>
              {post.description}
            </Typography>
            <Button style={{ marginTop: '2px' }} onClick={handleClickOpen('paper')}>
              Comments
          </Button>
          </CardContent>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
           
          >
            <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <CommentList CommentList={post.comments}/>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
          </Button>
            </DialogActions>
          </Dialog>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" style={{ color: 'red' }} onClick={() => handleLikes(post.id)} onMouseOver={() => handleshowlikes(post.id)}>
              <Tooltip title={`${Likes} Likes`} aria-label="add">
                <FavoriteIcon />
              </Tooltip>
            </IconButton>
            <TextField id={`posts[${index}]`} variant="outlined" placeholder="Comment" onChange={(event) => {
              setComment(event.target.value)
            }} />
            <Button onClick={() => handleComment(post.id)}>
              Send
          </Button>
          </CardActions>

        </Card>

      })}
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(PostList);

