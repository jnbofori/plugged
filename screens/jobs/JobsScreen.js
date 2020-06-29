import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import AddButton from '../../components/AddButton';
import jobModel from '../../models/jobModel';
import * as jobActions from '../../actions/jobActions';

export default function JobScreen({ route, navigation }){
  const [created, setCreated] = React.useState(false);

  const userId = useSelector(state => state.AuthReducer.userId);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    fetchData();
    if(route.params){
      setCreated(true)
      setTimeout(function(){ setCreated(false) }, 3000);
    }
  },[route.params])

  function fetchData(){
    let loadedJobs = [];
    let allJobsRef = firebase.database().ref("jobs");
    allJobsRef.on('child_added', function(data){
      // console.log(data.key);
      loadedJobs.push(new jobModel(data.key, data.val().description, data.val().phone, data.val().ownerId));
      
    })
    console.log('loaded jobs array', loadedJobs);
    dispatch(jobActions.fetchAllJobs(userId, loadedJobs));
  }

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={created}
          onRequestClose={() => {}}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Job Posted Successfully!</Text>
          </View>
        </Modal>

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
