import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AddButton from '../../components/AddButton';
import OwnJobItem from "../../components/OwnJobItem";
import firebase from "firebase";
import jobModel from "../../models/jobModel";
import * as jobActions from "../../actions/jobActions";
import {deleteJob} from "../../actions/jobActions";

export default function UsersJobsScreen({ navigation}) {
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const dispatch = useDispatch();
    const usersJobs = useSelector(state => state.JobReducer.usersJobs);
    const userId = useSelector(state => state.AuthReducer.userId);

    const fetchJobs = () =>{
        setIsRefreshing(true);
        let loadedUserJobs = [];
        let allJobsRef = firebase.database().ref("jobs");
        allJobsRef.on('child_added', function(data){
            // console.log(data.key);
            if(userId == data.val().ownerId) {
                loadedUserJobs.push(new jobModel(data.key, data.val().description, data.val().phone, data.val().ownerId));
                dispatch(jobActions.fetchUserJobs(userId, loadedUserJobs));
            }
        });
        // console.log('loaded jobs array', loadedJobs);
        setIsRefreshing(false);
    };

    const deleteJobs = (jobId) => {
        Alert.alert('Are you sure?', "You're about to delete this post",
            [
                {
                    text:"No",
                    style: "default"
                },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress:() =>{
                        firebase.database().ref('jobs/'+jobId).remove().then(()=>{
                            dispatch(jobActions.deleteJob(jobId));});
                    }
                }
            ]);
    };

    const editJob = (jobId) => {
        navigation.navigate('Edit', { jobId: jobId })
    };

    React.useEffect(()=> {
        fetchJobs();
    },[dispatch]);

    return (
      <View style={styles.container}>
        <FlatList
            data={usersJobs}
            keyExtractor={item => item.id}
            onRefresh={fetchJobs}
            refreshing={isRefreshing}
            renderItem={({item}) => <OwnJobItem
                                        description={item.description}
                                        deleteJob={()=>deleteJobs(item.id)}
                                        editJob={()=>editJob(item.id)}></OwnJobItem>}/>
        <AddButton onPress={()=> navigation.navigate('Post')} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

