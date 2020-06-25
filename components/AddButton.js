import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function AddButton(props) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={props.onPress}>
        <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        zIndex: 11,
        right: 10,
        bottom: 10,
        backgroundColor: "#2f95dc",
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        elevation: 8,
    },
  
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
  });
