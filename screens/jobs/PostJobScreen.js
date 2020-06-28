import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import * as firebase from 'firebase/app';
import { useSelector, useDispatch } from 'react-redux';
import { validateAll } from 'indicative/validator';
import * as jobActions from '../../actions/jobActions';


function PostJobScreen(props) {
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  const userId = useSelector(state => state.AuthReducer.userId);
  const descriptionErrMsg = useSelector(state => state.JobReducer.descriptionErrorMessage)
  const phoneErrMsg = useSelector(state => state.JobReducer.phoneErrorMessage)
  const dispatch = useDispatch();

  const rules = {
    description: 'required|min:15',
    phone: 'required|min:10',
  }

  const messages = {
    required: (field) => `${field} is required`,
    'description.min': 'Description is too short',
    'phone.min': 'Phone Number is too short',
  }

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

  const handleSubmit = async () =>{
    try{
        const Data = {
          description: description,
          phone: phone,
          }

        await validateAll(Data, rules, messages)

        let jobs = firebase.database().ref('jobs');
        let jobRef = jobs.push();
        jobRef.set({
          description: description,
          phone: phone,
          ownerId: userId
        })
        // console.log('Snapshot', jobRef.key); 
        data(jobRef.key);
    }catch(errors){
      console.log(errors);
      const formattedErrors={};
      errors.forEach(error => formattedErrors[error.field] = error.message)
      dispatch(jobActions.failedJob(formattedErrors.description, formattedErrors.phone))
    }
  }

  return (
    <KeyboardAvoidingView style={{flex:1, paddingHorizontal:6}} enabledKeyboardOffset={350}>
    <ScrollView contentContainerStyle={{alignItems: "center"}}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Jobs Description</Text>
        <Text style={{fontSize:13}}>(also include salary, time and address)</Text>
        {
        descriptionErrMsg != undefined && 
        (<View style={{paddingTop:4}}><Text style={{color:'red'}}>{descriptionErrMsg}</Text></View>)
        }
        <TextInput 
          style={styles.input} 
          returnKeyType='next' 
          multiline numberOfLines={20} 
          value={description} 
          onChangeText={(desc)=>setDescription(desc)}>
        </TextInput>
        <Text style={styles.label}>Phone</Text>
        <Text style={{fontSize:13}}>(Job seeker will call on this number )</Text>
        {
        phoneErrMsg != undefined && 
        (<View style={{paddingTop:4}}><Text style={{color:'red'}}>{phoneErrMsg}</Text></View>)
        }
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