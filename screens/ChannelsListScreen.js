import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import ChannelRect from '../components/ChannelRect'
import Faker from 'faker'

const ChannelsListScreen = () => {
    
    //const [titles, setTitles] = useState([])
    const [channels, setChannels] = useState([])

    useEffect(() => {
        // fetch('http://a3c81782cb7f.ngrok.io')
        // .then(response => response.json())
        // .then((data) => {
        //     console.log(data)
        //     setChannels(data)
        // })
        tmpChannels = [];
        for (var i = 0; i < 10; ++i) {
            tmpChannels.push({
                'title': Faker.name.findName(),
                'icon_url': Faker.image.cats()
            })
        } 
        console.log(tmpChannels)
        setChannels(tmpChannels);
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