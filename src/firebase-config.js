import React from 'react';
import firebase from 'firebase';
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
        this.db = firebase.database();
    }


    signin(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signout() {
        return this.auth.signOut();
    }

    async signup(name, email, password, firstname, lastname) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name
        }),
            this.db.ref('users').push({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            })
    }

    AddPost(displayname, title, photourl, description, createdat) {
        var newPostKey = this.db.ref().child('posts').push().key;//This generate unquie key id in every post.
        this.db.ref('posts').push({
            id : newPostKey,
            displayName: displayname,
            title: title,
            photourl: photourl,
            description: description,
            createdAt: createdat
        })
    }

    deleteuser(userid) {
        return this.db.ref('users').child(`${userid}`).remove();//this remove current user from users database.
    }

    AddComments(Id,Comment,displayname,profileimg){
        return this.db.ref(`posts/${Id}/comments`).push({
            Comment : Comment,
            displayName : displayname,
            profileimg : profileimg
        });
    }

    AddLikes(Id,Like){
         return this.db.ref(`posts/${Id}/Likes`).push(Like);
    }

    deletepost(postid){
        return this.db.ref('posts').child(`${postid}`).remove();//this remove clicked post from posts database.
    }
}


export default new Firebase();