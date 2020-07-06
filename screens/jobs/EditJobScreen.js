import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity, Platform
} from 'react-native';
import * as firebase from 'firebase/app';
import { useSelector, useDispatch } from 'react-redux';
import { validateAll } from 'indicative/validator';
import * as jobActions from '../../actions/jobActions';

function EditJobScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');

  const usersJobs = useSelector(state => state.JobReducer.usersJobs);
  const titleErrMsg = useSelector(state => state.JobReducer.titleErrorMessage);
  const descriptionErrMsg = useSelector(state => state.JobReducer.descriptionErrorMessage);
  const locationErrMsg = useSelector(state => state.JobReducer.locationErrorMessage);
  const phoneErrMsg = useSelector(state => state.JobReducer.phoneErrorMessage);
  const deadlineErrMsg = useSelector(state => state.JobReducer.deadlineErrorMessage);
  const dispatch = useDispatch();
  const { jobId } = route.params;

  const jobToUpdate = usersJobs ? usersJobs.find(job => job.id === jobId) : [];
  console.log('users job to update------------------', jobToUpdate);

  useEffect(() => {
    setTitle(jobToUpdate.title);
    setDescription(jobToUpdate.description);
    setLocation(jobToUpdate.location);
    setPhone(jobToUpdate.phone);
    setDeadline(jobToUpdate.deadline);
  },[]);

  const rules = {
    title: 'required|min:5',
    description: 'required|min:15',
    location: 'required|min:5',
    phone: 'required|min:10',
    deadline: 'required|min:8',
  };

  const messages = {
    required: (field) => `${field} is required`,
    'title.min': 'Job title is too short',
    'description.min': 'Description is too short',
    'location.min': 'Location is invalid',
    'phone.min': 'Phone Number is too short',
    'deadline.min': 'Invalid Deadline',
  };

  const handleSubmit = async () =>{
    try{
      const Data = {
        title: title,
        description: description,
        location: location,
        phone: phone,
        deadline: deadline,
      };

      await validateAll(Data, rules, messages);

      let job = firebase.database().ref('jobs/'+jobId);
      job.update({
        description: description,
        phone: phone
      }).then(()=>{
        dispatch(jobActions.clearErrorMessage());
        navigation.navigate('UsersJobs', { jobEdited: true });
      })
      // console.log('Snapshot', jobRef.key);
      // data(jobRef.key);
    }catch(errors){
      // console.log(errors);
      const formattedErrors={};
      errors.forEach(error => formattedErrors[error.field] = error.message)
      dispatch(jobActions.failedJob(
          formattedErrors.title,
          formattedErrors.description,
          formattedErrors.location,
          formattedErrors.phone,
          formattedErrors.deadline))
    }
  };

  return (
      <KeyboardAvoidingView style={{flex:1, paddingHorizontal:6}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{alignItems: "center"}}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Job Title</Text>
            {titleErrMsg != undefined &&
            (<View style={{paddingTop:4, marginHorizontal: 7}}><Text style={{color:'red'}}>{titleErrMsg}</Text></View>)}
            <TextInput
                style={styles.input}
                returnKeyType='next'
                value={title}
                onChangeText={(title)=>setTitle(title)}>
            </TextInput>

            <Text style={styles.label}>Job Description</Text>
            <Text style={{fontSize:13, marginHorizontal: 7}}>(Include all relevant information as you see fit)</Text>
            {
              descriptionErrMsg != undefined &&
              (<View style={{paddingTop:4, marginHorizontal: 7}}><Text style={{color:'red'}}>{descriptionErrMsg}</Text></View>)
            }
            <TextInput
                style={styles.textArea}
                returnKeyType='next'
                multiline numberOfLines={20}
                value={description}
                onChangeText={(desc)=>setDescription(desc)}>
            </TextInput>

            <Text style={styles.label}>Location</Text>
            {locationErrMsg != undefined &&
            (<View style={{paddingTop:4, marginHorizontal: 7}}><Text style={{color:'red'}}>{locationErrMsg}</Text></View>)}
            <TextInput
                style={styles.input}
                returnKeyType='next'
                value={location}
                onChangeText={(location)=>setLocation(location)}>
            </TextInput>

            <Text style={styles.label}>Phone</Text>
            <Text style={{fontSize:13, marginHorizontal: 7}}>(Job seeker will call on this number)</Text>
            {
              phoneErrMsg != undefined &&
              (<View style={{paddingTop:4,marginHorizontal: 7}}><Text style={{color:'red'}}>{phoneErrMsg}</Text></View>)
            }
            <TextInput
                style={styles.input}
                returnKeyType='next'
                keyboardType = 'phone-pad'
                value={phone}
                onChangeText={(phone)=>setPhone(phone)}>
            </TextInput>

            <Text style={styles.label}>Deadline</Text>
            {deadlineErrMsg != undefined &&
            (<View style={{paddingTop:4, marginHorizontal: 7}}><Text style={{color:'red'}}>{deadlineErrMsg}</Text></View>)}
            <TextInput
                style={styles.input}
                returnKeyType='next'
                value={deadline}
                onChangeText={(deadline)=>setDeadline(deadline)}>
            </TextInput>
          </View>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginTop: 15,
  },
  label: {
    fontSize: 17,
    marginHorizontal: 7,
  },
  textArea: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    backgroundColor: '#f9f7f6',
    height: 150,
    fontSize: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 7,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    backgroundColor: '#f9f7f6',
    fontSize: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 7,
    marginHorizontal: 7,
  },
  button: {
    marginBottom: 30,
    marginTop: 10,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#2f95dc',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
  },
  buttonText: {
    color: 'white',
    paddingVertical: 15,
  }
});


export default EditJobScreen;