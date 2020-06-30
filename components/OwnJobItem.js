import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Communications from 'react-native-communications';

export default function OwnJobItem(props) {
    return (
        <View style={styles.container}>
            <View style={{...styles.card}}>
                <Text style={{fontSize:17, lineHeight:22}}>{props.description}</Text>
                <TouchableOpacity onPress={() => Communications.phonecall(props.phone, true)}>
                    <View>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                            <AntDesign name='edit' size={22} style={{paddingRight:8}} />
                            <AntDesign name='delete' size={22} style={{paddingRight:8}} />
                        </View>
                    </View>
                </TouchableOpacity>
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
