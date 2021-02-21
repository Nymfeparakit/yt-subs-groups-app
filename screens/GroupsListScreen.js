import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import ChannelRect from '../components/ChannelRect'
import Faker from 'faker'
import { AntDesign } from '@expo/vector-icons'
import { getGroups } from '../data/ApiHelper'


const GroupsListScreen = ({ navigation }) => {

    const [groups, setGroups] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    const renderItem = ({ item, index}) => {
        const backgroundColor = index === selectedId ? "#f9c2ff" : "#6e3b6e"

        const onPress = (index) => {
            setSelectedId(index)
        }

        return (
            <ChannelRect
                id={index}
                style={{ backgroundColor }}
                onPress={() => onPress(index)}
                title={item["name"]}
                icon_url={item["icon_url"]}
            />)
    }

    useEffect(() => {
        getGroups().then(fetchedGroups => {
            console.log("groups: " + fetchedGroups)
            setGroups(fetchedGroups)
        })
        // tmpChannels = [];
        // for (var i = 0; i < 20; ++i) {
            // tmpChannels.push({
                // 'title': Faker.name.findName(),
                // 'icon_url': Faker.image.cats()
            // })
        // }
        // setChannels(tmpChannels);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.list}
                data={groups}
                renderItem={renderItem}
                keyExtractor={item => item["name"]}
            />
            <TouchableOpacity 
            style={styles.bottomButton}
            onPress={() => navigation.navigate('New group')}>
                <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        justifyContent: 'space-between'
    },
    list: {
        // flex: 5
        height: '80%'
    },
    bottomButton: {
        flex: 1,
        alignSelf: 'center'
    }
})

export default GroupsListScreen;