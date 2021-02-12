import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import ChannelRect from '../components/ChannelRect'
import Faker from 'faker'
import { AntDesign } from '@expo/vector-icons'
import { getChannels } from '../data/ApiHelper'


const ChannelsListScreen = ({ navigation }) => {

    const [channels, setChannels] = useState([])
    const [selectedIds, setSelectedIds] = useState([])

    const renderItem = ({ item, index }) => {
        const backgroundColor = selectedIds.includes(item["id"]) ? "#6e3b6e" : "#f9c2ff"

        const onPress = (id) => {
            selectedIds.includes(id)
                ? setSelectedIds(selectedIds.filter(item => item !== id))
                : setSelectedIds([...selectedIds, id])
        }

        return (
            <ChannelRect
                id={item["id"]}
                style={{ backgroundColor }}
                onPress={() => onPress(item["id"])}
                title={item["title"]}
                icon_url={item["icon_url"]}
            />)
    }

    useEffect(() => {
        getChannels().then(fetchedChannels => setChannels(fetchedChannels))
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
                            const selectedChannels = channels.filter(item => selectedIds.includes(item["id"]))
                            navigation.navigate('Choose group', {channels: selectedChannels})
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