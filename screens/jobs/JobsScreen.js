import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import AddButton from '../../components/AddButton';

export default function JobScreen({ navigation }){
    return (
      <View style={styles.container}>
        <Text>Job Screen</Text>
        <AddButton onPress={()=> navigation.navigate('Post')}/>
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
