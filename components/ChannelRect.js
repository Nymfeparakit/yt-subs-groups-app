import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const ChannelRect = ({ title, icon_url }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={{uri: icon_url}}
                style={styles.channel_icon}
            />
            <Text style={styles.title}>{ title }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'row'
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