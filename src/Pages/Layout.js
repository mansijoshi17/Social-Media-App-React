import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Appbar from '../Components/Appbar';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';


function Layout() {
    return (
        <div>
            <Router>
                <Appbar />
                <div>
                    <Route path="/signup">
                        <SignUpPage />
                    </Route>
                    <Route path="/signin">
                        <SignInPage />
                    </Route>

                </div>
            </Router>
        </div >
    );
}

export default Layout;