import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import {Alert} from "react-native";
import firebase from "firebase";

export default function LogoutIcon(props) {
  const logout = () => {
    Alert.alert('Leaving Already?', "Are you sure you want to log out?",
        [
          {
            text:"No",
            style: "default"
          },
          {
            text: "Yes",
            style: "destructive",
            onPress:() =>{ firebase.auth().signOut() }
          }
        ]);
  };

  return (
    <Feather
      name={props.name}
      size={24}
      style={{marginRight: 15}}
      color="#2f95dc"
      onPress={logout}
    />
  );
}
