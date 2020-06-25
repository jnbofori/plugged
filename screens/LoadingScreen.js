import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firebase, { auth } from 'firebase';
import { useDispatch } from 'react-redux';
import * as authAction from '../actions/AuthActions'


export default function LoadingScreen(props) {
    const dispatch = useDispatch();

    React.useEffect(() => {
        checkifLoggedIn();
    },[]);
    

    const checkifLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                console.log(user.getIdToken);
            
                dispatch(authAction.loggedIn(user.uid, user.getIdToken, user.displayName, user.email, user.photoURL))
                props.navigation.navigate('Home');
            }else{
                props.navigation.navigate('Login');
            }
        })
    }

    return (
        <View style={styles.container}>
        <ActivityIndicator size='large'/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

