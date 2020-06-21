import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyAdTPlKV_segOogfit90M4V4Zi74mSCleM",
  authDomain: "plugged-6cec5.firebaseapp.com",
  databaseURL: "https://plugged-6cec5.firebaseio.com",
  projectId: "plugged-6cec5",
  storageBucket: "plugged-6cec5.appspot.com",
  messagingSenderId: "65313385227",
  appId: "1:65313385227:web:4048248873ba66aba9100e",
  measurementId: "G-1ZXT4G2DHS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
