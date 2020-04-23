import React from 'react';
import CreatePost from './CreatePost';
import PostList from './PostList';



function Post() {
    return (
        <div>
          <CreatePost/>
          {/* create post button component */}
          <PostList/>
          {/* postlist component */}
        </div>
    );
}

export default Post;