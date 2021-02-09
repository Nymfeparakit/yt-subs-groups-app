import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import ChannelRect from '../components/ChannelRect'
import Faker from 'faker'
import { AntDesign } from '@expo/vector-icons'


const ChannelsListScreen = ({ navigation }) => {

    const [channels, setChannels] = useState([])
    //const [selectedId, setSelectedId] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])

    const renderItem = ({ item, index }) => {
        const backgroundColor = selectedIds.includes(index) ? "#6e3b6e" : "#f9c2ff"

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
        fetch('http://46e56975047d.ngrok.io/channels/')
        .then(response => response.json())
        .then((data) => {
            setChannels(data)
        })
        // tmpChannels = [];
        // for (var i = 0; i < 10; ++i) {
        //     tmpChannels.push({
        //         'title': Faker.name.findName(),
        //         'icon_url': Faker.image.cats()
        //     })
        // }
        // setChannels(tmpChannels);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={channels}
                renderItem={renderItem}
                keyExtractor={item => item["title"]}
                style={styles.list}
            />
            {
                typeof selectedIds !== 'undefined' && selectedIds.length > 0 ?
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={() => {
                            // channelsTitles = []
                            // channels.forEach((item, index) => {
                            //     if (selectedIds.includes(index)) {
                            //         channelsTitles.push(item['title'])
                            //     }
                            // })
                            // navigation.navigate('Choose group', { channels: channelsTitles })
                            navigation.navigate('Choose group', {channels})
                            }
                        }>
                        <AntDesign name="pluscircle" size={24} color="black" />
                    </TouchableOpacity>
                    : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    list: {
        height: '80%'
    },
    bottomButton: {
        flex: 1,
        alignSelf: 'center'
    }
})

export default ChannelsListScreen;