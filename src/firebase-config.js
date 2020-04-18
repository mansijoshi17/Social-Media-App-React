import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBNtS1EKx5hUrlHC1B-L159UERVOS5bEWU",
    authDomain: "social-media-app-786a4.firebaseapp.com",
    databaseURL: "https://social-media-app-786a4.firebaseio.com",
    projectId: "social-media-app-786a4",
    storageBucket: "social-media-app-786a4.appspot.com",
    messagingSenderId: "386769723466",
    appId: "import * as firebase from 'firebase';1:386769723466:web:1ecc1a05a40779342386b3",
    measurementId: "G-DPGM5N8L1D"
};

class Firebase extends React.Component {
    constructor() {
        super();
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore;
    }

    signin(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signout() {
        return this.auth.signOut();
    }

    async signup(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }
}


export default new Firebase();