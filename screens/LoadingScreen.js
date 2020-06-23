import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        this.checkifLoggedIn();
    }

    checkifLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.props.navigation.navigate('Home');
            }else{
                this.props.navigation.navigate('Login');
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
            <ActivityIndicator size='large'/>
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

