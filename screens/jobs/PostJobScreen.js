import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import * as firebase from 'firebase/app';
import { useSelector, useDispatch } from 'react-redux';
import { validate } from 'indicative/validator';
import * as jobActions from '../../actions/jobActions';


function PostJobScreen(props) {
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  const userId = useSelector(state => state.AuthReducer.userId);
  const dispatch = useDispatch();

  // const data = useCallback(
  //   () => {
  //     const jobData = {
  //       description: description,
  //       phone: phone
  //     }
  //     dispatch(jobActions.postJob(jobData));
  //   },
  //   [description, phone],
  // );
  function data(jobId){
    const jobData = {
      id: jobId,
      description: description,
      phone: phone,
      ownerId: userId,
    }

    // console.log("Job Data", jobData);
    dispatch(jobActions.postJob(jobData));
  }

  const handleSubmit = () =>{
    let jobs = firebase.database().ref('jobs');
    let jobRef = jobs.push();
    jobRef.set({
      description: description,
      phone: phone,
      ownerId: userId
    })
      // console.log('Snapshot', jobRef.key); 
    data(jobRef.key);
  }

  return (
    <KeyboardAvoidingView style={{flex:1, paddingHorizontal:6}} enabledKeyboardOffset={350}>
    <ScrollView contentContainerStyle={{alignItems: "center"}}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Jobs Description</Text>
        <Text style={{fontSize:13}}>(also include salary, time and address)</Text>
        <TextInput 
          style={styles.input} 
          returnKeyType='next' 
          multiline numberOfLines={20} 
          value={description} 
          onChangeText={(desc)=>setDescription(desc)}>
        </TextInput>
        <Text style={styles.label}>Phone</Text>
        <Text style={{fontSize:13}}>(Job seeker will call on this number )</Text>
        <TextInput 
          style={styles.phone} 
          returnKeyType='next' 
          keyboardType = 'phone-pad'
          value={phone} 
          onChangeText={(phone)=>setPhone(phone)}>
        </TextInput>
        <Button title="Submit Job" onPress={handleSubmit}/>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginTop: 15
  },
  label: {
    fontSize: 20
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    backgroundColor: '#f9f7f6',
    height: 150,
    fontSize: 15,
    borderColor: '#ccc',
    borderWidth: 2,
    marginVertical: 5,
  },
  phone: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    backgroundColor: '#f9f7f6',
    fontSize: 15,
    borderColor: '#ccc',
    borderWidth: 2,
    marginVertical: 5,
  }
});


export default PostJobScreen;