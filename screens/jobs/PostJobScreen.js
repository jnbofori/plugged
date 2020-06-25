import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView, Button } from 'react-native';

function PostJobScreen(props) {
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

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
        <Button title="Submit Job" onPress={()=>{}}/>
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
    fontSize: 22,
    borderColor: '#ccc',
    borderWidth: 2,
    marginVertical: 5,
  },
  phone: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    backgroundColor: '#f9f7f6',
    fontSize: 22,
    borderColor: '#ccc',
    borderWidth: 2,
    marginVertical: 5,
  }
});


export default PostJobScreen;