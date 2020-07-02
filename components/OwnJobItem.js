import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function OwnJobItem(props) {
    return (
        <View style={styles.container}>
            <View style={{...styles.card}}>
                <Text style={{fontSize:17, lineHeight:22}}>{props.description}</Text>
                    <View>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                            <TouchableOpacity onPress={props.editJob}><AntDesign name='edit' size={22} style={{paddingRight:8}} /></TouchableOpacity>
                            <TouchableOpacity onPress={props.deleteJob}><AntDesign name='delete' size={22} style={{paddingRight:8}} /></TouchableOpacity>
                        </View>
                    </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        marginTop: 0,
        marginBottom: 2,
    },
    card: {
        elevation: 5,
        borderRadius: 5,
        padding: 8
    }
});
