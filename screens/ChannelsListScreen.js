import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import ChannelRect from '../components/ChannelRect'
import Faker from 'faker'


const ChannelsListScreen = () => {

    const [channels, setChannels] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff"

        return (
        <TouchableOpacity
            onLongPress={() => setSelectedId(item.id)}>
            <ChannelRect
                style={{ backgroundColor }}
                title={item["title"]}
                icon_url={item["icon_url"]}
            />
        </TouchableOpacity>)
    }

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
                renderItem={renderItem}
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