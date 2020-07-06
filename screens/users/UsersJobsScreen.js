import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList, Alert, Modal} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AddButton from '../../components/AddButton';
import OwnJobItem from "../../components/OwnJobItem";
import firebase from "firebase";
import jobModel from "../../models/jobModel";
import * as jobActions from "../../actions/jobActions";
import {deleteJob} from "../../actions/jobActions";
import JobItem from "../../components/JobItem";

export default function UsersJobsScreen({ navigation, route }) {
    const [created, setCreated] = React.useState(false);
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
                firebase.database().ref('users/'+data.val().ownerId).once('value', function (dataSnapshot) {
                    loadedUserJobs.push(new jobModel(
                        data.key,
                        data.val().title,
                        data.val().description,
                        data.val().location,
                        data.val().phone,
                        data.val().deadline,
                        data.val().ownerId,
                        dataSnapshot.val().first_name,
                        dataSnapshot.val().last_name,
                        dataSnapshot.val().profile_picture));
                    dispatch(jobActions.fetchUserJobs(userId, loadedUserJobs.reverse()));
                });
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
        if(route.params){
            setCreated(true);
            setTimeout(function(){ setCreated(false) }, 2000);
        }
        fetchJobs();
    },[dispatch, route.params]);

    return (
      <View style={styles.container}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={created}
              onRequestClose={() => {}}>
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>Edited Successfully!</Text>
              </View>
          </Modal>

        <FlatList
            data={usersJobs}
            keyExtractor={item => item.id}
            onRefresh={fetchJobs}
            refreshing={isRefreshing}
            renderItem={({item}) => <OwnJobItem
                                        title={item.title}
                                        description={item.description}
                                        location={item.location}
                                        deadline={item.deadline}
                                        profilePic={item.profilePic}
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
    modalText: {
        justifyContent: "center",
        textAlign: "center",
        color: "white"
    },
    modalView: {
        margin: 20,
        marginTop: 75,
        backgroundColor: "#2f95dc",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});

