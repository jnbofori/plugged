import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Communications from 'react-native-communications';

export default function JobItem(props) {
  return (
      <View style={styles.container}>
          <View style={styles.baseItem}>
          <Image source={{uri:props.profilePic}} style={styles.profileImage} onPress={props.onPress} />
          <View style={styles.textItem}>
              <Text style={{fontSize:16, lineHeight:22, color: '#9E9E9E'}}>{props.firstName} {props.lastName}</Text>
              <Text style={{fontSize:16.5, lineHeight:22, fontWeight: "500"}}>{props.title}</Text>
              <Text style={{fontSize:16, lineHeight:22}}>{props.description}</Text>
              <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize:16, lineHeight:22, fontWeight: "500"}}>Location: </Text>
                  <Text style={{fontSize:16, lineHeight:22}}>{props.location}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize:16, lineHeight:22, fontWeight: "500"}}>Deadline: </Text>
                  <Text style={{fontSize:16, lineHeight:22}}>{props.deadline}</Text>
              </View>
          </View>
          </View>
          <TouchableOpacity style={styles.phone} onPress={() => Communications.phonecall(props.phone, true)}>
              <View>
                  <View style={{flexDirection: 'row'}}>
                      <FontAwesome name='phone' size={22} style={{paddingRight:8}} color={'#175887'} />
                      <Text style={{fontSize:17, lineHeight:22, color: '#175887'}}>Call</Text>
                  </View>
              </View>
          </TouchableOpacity>
      </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 2,
    },
    baseItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: 'white',
    },
    textItem: {
        marginLeft: 10,
        flexGrow: 1,
        flexBasis: 0,
        paddingRight: 4,
    },
    profileImage: {
        height:45,
        width:45,
        borderRadius: 22.5,
        marginLeft:5,
        marginTop: 4,
    },
    phone: {
        alignItems: 'flex-end',
        marginRight: 20,
        marginBottom: 7,
        marginTop: -7,
    }
  });
