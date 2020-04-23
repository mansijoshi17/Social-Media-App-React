import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

function CommentList({ CommentList }) {
    const classes = useStyles();

    console.log(CommentList);

    return (
        <List className={classes.root}>
            {Object.keys(CommentList).map((key) => {
                return <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={CommentList[key].displayName}
                        secondary={
                            <React.Fragment>
                                {CommentList[key].Comment}
                            </React.Fragment>
                        }
                    />
                </ListItem>

            })}

        </List>
    )
}

export default CommentList;