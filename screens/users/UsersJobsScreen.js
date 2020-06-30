import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AddButton from '../../components/AddButton';
import OwnJobItem from "../../components/OwnJobItem";

export default function UsersJobsScreen({ navigation}) {
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const dispatch = useDispatch();
    const usersJobs = useSelector(state => state.JobReducer.usersJobs);

    const fetchJobs = () =>{

    };

    return (
      <View style={styles.container}>
        <FlatList
            data={usersJobs}
            keyExtractor={item => item.id}
            renderItem={({item}) => <OwnJobItem description={item.description} phone={item.phone.toString()}></OwnJobItem>}/>
        <AddButton onPress={()=> navigation.navigate('Post')} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

