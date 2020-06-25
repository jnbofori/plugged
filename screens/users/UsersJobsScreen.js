import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddButton from '../../components/AddButton';

export default function UsersJobsScreen({ navigation}) {
    return (
      <View style={styles.container}>
        <Text>User's Jobs Screen</Text>
        <AddButton onPress={()=> navigation.navigate('Post')} />
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

