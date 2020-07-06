import React, { Component } from 'react';
import {StyleSheet, Text, View, Modal, FlatList, ActivityIndicator, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import AddButton from '../../components/AddButton';
import jobModel from '../../models/jobModel';
import * as jobActions from '../../actions/jobActions';
import JobItem from '../../components/JobItem';
import { useFocusEffect } from '@react-navigation/native';

export default function JobScreen({ route, navigation }){
  const [created, setCreated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const userId = useSelector(state => state.AuthReducer.userId);
  const allJobs = useSelector(state => state.JobReducer.availableJobs);
  const dispatch = useDispatch();

  function fetchData(){
    setIsRefreshing(true);
    let loadedJobs = [];
    let allJobsRef = firebase.database().ref("jobs");
    allJobsRef.on('child_added', function(data){
      // console.log(data.key);
      firebase.database().ref('users/'+data.val().ownerId).once('value', function (dataSnapshot) {
          loadedJobs.push(new jobModel(
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
          dispatch(jobActions.fetchAllJobs(userId, loadedJobs.reverse()));
      })

    });
    // console.log('loaded jobs array', loadedJobs);
    setIsRefreshing(false);
  }

  React.useEffect(()=> {
    if(route.params){
      setCreated(true);
      setTimeout(function(){ setCreated(false) }, 2000);
    }
  },[route.params])

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      fetchData();
      setIsLoading(false);
    }, [dispatch])
  );


  function LoadingImage(){
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
          <ActivityIndicator size='large' animating/>
        </View>
    );
  }

    return (
      <View style={styles.container} onPress={() => forceUpdate()}>
        { isLoading && <LoadingImage/> }
        <Modal
          animationType="slide"
          transparent={true}
          visible={created}
          onRequestClose={() => {}}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Job Posted Successfully!</Text>
          </View>
        </Modal>

        <FlatList
          data={allJobs}
          keyExtractor={item => item.id}
          onRefresh={fetchData}
          refreshing={isRefreshing}
          renderItem={({item}) => <JobItem
                                    title={item.title}
                                    description={item.description}
                                    location={item.location}
                                    phone={item.phone.toString()}
                                    deadline={item.deadline}
                                    firstName={item.firstName}
                                    lastName={item.lastName}
                                    profilePic={item.profilePic}></JobItem>}/>
        <AddButton onPress={()=> navigation.navigate('Post')}/>
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
