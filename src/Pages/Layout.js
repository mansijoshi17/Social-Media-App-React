import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Appbar from '../Components/Appbar';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import ProfilePage from './ProfilePage';
import PostListPage from './PostListPage';


function Layout() {
    return (
        <div>
            <Router>
                <Appbar />
                <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '345px' }}>
                    <Route exact path="/postlist">
                        <PostListPage />
                    </Route>
                    <Route path="/signup">
                        <SignUpPage />
                    </Route>
                    <Route path="/signin">
                        <SignInPage />
                    </Route>
                    <Route path="/profile">
                        <ProfilePage />
                    </Route>
                </div>
            </Router>
        </div >
    );
}

export default Layout;