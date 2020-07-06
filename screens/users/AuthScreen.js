import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';

export default class AuthScreen extends Component {
  constructor(props){
    super(props);
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
            );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
        .then(function(result){
          console.log('user signed in', result);
          dispatch(authAction.loggedIn(
            result.user.uid, 
            result.user.getIdToken, 
            result.user.displayName, 
            result.user.email, 
            result.user.photoURL))
          if (result.additionalUserInfo.isNewUser) {
          firebase
            .database()
            .ref('users/' + result.user.uid)
            .set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              first_name: result.additionalUserInfo.profile.given_name,
              last_name: result.additionalUserInfo.profile.family_name,
              created_at: Date.now()
            })
            .then(function(snapshot) {
              // console.log('Snapshot', snapshot);
            });        
          }else {
                firebase
                  .database()
                  .ref('users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '65313385227-fmbn0nf5j2q5ana90rj5073ttbe3k102.apps.googleusercontent.com',
        iosClientId: '65313385227-tfs26iqt11nsko0s06ekpjfgbdnnkrir.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Sign in with Google' onPress={() => this.signInWithGoogleAsync()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

