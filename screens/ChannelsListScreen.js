import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import ChannelRect from '../components/ChannelRect'
import Faker from 'faker'


const ChannelsListScreen = () => {

    const [channels, setChannels] = useState([])
    //const [selectedId, setSelectedId] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])

    const renderItem = ({ item, index}) => {
        //const backgroundColor = index === selectedId ? "#f9c2ff" : "#6e3b6e"
        const backgroundColor = selectedIds.includes(index) ? "#f9c2ff" : "#6e3b6e"
        
        const onPress = (index) => {
            selectedIds.includes(index) 
            ? setSelectedIds(selectedIds.filter(item => item !== index)) 
            : setSelectedIds([...selectedIds, index])
            //setSelectedId(index)
        }

        return (
            <ChannelRect
                id={index}
                style={{ backgroundColor }}
                onPress={() => onPress(index)}
                title={item["title"]}
                icon_url={item["icon_url"]}
            />)
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