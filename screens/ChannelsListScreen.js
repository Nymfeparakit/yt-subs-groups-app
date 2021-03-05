import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Faker from 'faker'
import { AntDesign } from '@expo/vector-icons'
import { getChannels } from '../data/ApiHelper'
import { List } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'


const ChannelsListScreen = ({ navigation }) => {

    const [channels, setChannels] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [expanded, setExpanded] = useState(true)
    const [groupsArrItem, setGroupsArrItem] = useState([])

    const handlePress = () => setExpanded(!expanded)

    const successCallback = (fetchedChannels) => {
            console.log("win with promise");
            console.log(fetchedChannels);
            setChannels(fetchedChannels);
            console.log("set channels");
            var groupsArrItemTmp = []
            for (var groupName in channels) {
                console.log("group name: " + groupName);
                const groupChannelsList = channels[groupName]
                if (groupChannelsList.length == 0)
                    continue
                var channelsArrItem = []
                for (const [index, channel] of groupChannelsList.entries()) {
                    channelsArrItem.push(<List.Item key={channel["id"]} title={channel["title"]} />)
                }
                groupsArrItemTmp.push(
                    <List.Accordion
                        title={groupName}
                        key={groupName}>
                        {channelsArrItem}
                    </List.Accordion>
                )
            }
            setGroupsArrItem(groupsArrItemTmp)
        }
    useEffect(() => {
        getChannels()
        .then(successCallback)
        .catch(err => console.log("failed with promise again: " + err.message));
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
            <ScrollView>
            <List.Section title="Channels">
                {groupsArrItem}
            </List.Section>
            </ScrollView>
            {
                typeof selectedIds !== 'undefined' && selectedIds.length > 0 ?
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={() => {
                            const selectedChannels = channels.filter(item => selectedIds.includes(item["id"]))
                            navigation.navigate('Choose group', { channels: selectedChannels })
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