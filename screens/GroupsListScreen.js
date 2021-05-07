import React, { useEffect, useState, useCallback } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import ChannelRect from '../components/ChannelRect'
import GroupRect from '../components/GroupRect'
import Faker from 'faker'
import { AntDesign } from '@expo/vector-icons'
import { getGroups, deleteGroup } from '../data/ApiHelper'
import { useFocusEffect } from '@react-navigation/native'

const GroupsListScreen = ({ navigation }) => {

    const [groups, setGroups] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    const renderItem = ({ item, index }) => {

        const onPress = (id) => {
            navigation.navigate("Group videos",
                {
                    groupId: id
                });
        }

        const onLongPress = (id) => {
            setSelectedId(id);
        }

        const onRemovePress = (id) => {
            console.log("remove pressed");
            deleteGroup(id)
            .then(() => {
                setSelectedId(null);
                fetchGroups();
            })
            .catch(err => console.log("failed deleting group: " + err.message));
        }

        return (
            <GroupRect
                id={item["id"]}
                onPress={onPress}
                onLongPress={onLongPress}
                onRemovePress={onRemovePress}
                isSelected={item["id"] === selectedId}
                title={item["name"]}
            // icon_url={item["icon_url"]}
            />)
    }

    const fetchGroups = () => {
        getGroups().then(fetchedGroups => {
            setGroups(fetchedGroups)
        })
    }

    useFocusEffect(
        useCallback(() => fetchGroups(), [])
    );

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
        height: '80%'
    },
    bottomButton: {
        flex: 1,
        alignSelf: 'center'
    }
})

export default GroupsListScreen;