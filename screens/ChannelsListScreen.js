import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import ChannelRect from '../components/ChannelRect'

const ChannelsListScreen = () => {
    
    //const [titles, setTitles] = useState([])
    const [channels, setChannels] = useState([])

    useEffect(() => {
        fetch('http://ea83e6f58e56.ngrok.io')
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            setChannels(data)
        }) 
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={channels}
                renderItem={({ item }) => (
                    <ChannelRect 
                        title={ item["title"] }
                        icon_url={ item["icon_url"] }
                    />                
                )
                }
                keyExtractor={item => item["title"]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    }
})

export default ChannelsListScreen;