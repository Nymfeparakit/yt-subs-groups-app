import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChannelRect = ({ title, icon_url, style, onPress, index }) => {
    return (
        <TouchableOpacity 
        style={[styles.container, style]}
        onLongPress={() => onPress(index)}>
            <Image 
                source={{uri: icon_url}}
                style={styles.channel_icon}
            />
            <Text style={styles.title}>{ title }</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 8,
        backgroundColor: "#DCDCDC",
        alignItems: "center"
    },
    title: {
        fontWeight: 'bold'        
    },
    channel_icon: {
        height: 50,
        width: 50
    }
});

export default ChannelRect;