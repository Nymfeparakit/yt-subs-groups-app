import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import Faker from 'faker'
import { AntDesign } from '@expo/vector-icons'
import { getChannels } from '../data/ApiHelper'
import { List } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { Accordion } from 'native-base';

const ChannelsListScreen = ({ navigation }) => {

    const [channels, setChannels] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [expanded, setExpanded] = useState(true)
    const [groupsArrItem, setGroupsArrItem] = useState([])
    const [accordionDataArray, setAccordionDataArray] = useState([]);

    const handlePress = () => setExpanded(!expanded)

    const onChannelPress = (channelId) => {
        channelId in selectedIds ?
            selectedIds.filter(item => item != channelId)
            : setSelectedIds([...selectedIds, channelId]);
    };

    // const successCallback = (fetchedChannels) => {
    //     console.log("win with promise");
    //     // console.log(fetchedChannels);
    //     setChannels(fetchedChannels);
    //     console.log("set channels");
    //     var groupsArrItemTmp = []
    //     for (var groupName in channels) {
    //         console.log("group name: " + groupName);
    //         const groupChannelsList = channels[groupName]
    //         if (groupChannelsList.length == 0)
    //             continue
    //         var channelsArrItem = []
    //         var channelsArr = [];
    //         for (const [index, channel] of groupChannelsList.entries()) {
    //             channelsArr.push(channel);
    //         }
    //         groupsArrItemTmp.push(
    //             <List.Accordion
    //                 title={groupName}
    //                 key={groupName}>
    //                 {/* {channelsArrItem} */}
    //                 <FlatList
    //                     data={channelsArr}
    //                     renderItem={({ item }) => {
    //                         return (
    //                             <View style={{ flexDirection: 'row' }}>
    //                                 <Image
    //                                     source={{ uri: item["icon_url"] }}
    //                                     style={{ width: 50, height: 50 }}
    //                                 />                                   
    //                                 <Text>{item["title"]}</Text>
    //                             </View>
    //                         );
    //                     }
    //                     }
    //                     keyExtractor={item => item["id"]}
    //                 />
    //             </List.Accordion>
    //         )
    //     }
    //     setGroupsArrItem(groupsArrItemTmp)
    // }

    const successCallback = (fetchedChannels) => {
        console.log("set channels");
        setChannels(fetchedChannels);
        var accordionDataArrayTmp = [];
        console.log("channels: " + channels);
        for (var groupName in channels) {
            console.log("group name: " + groupName);
            const channelsInGroup = channels[groupName];
            if (channelsInGroup.length == 0) {
                continue;
            }
            accordionDataArrayTmp.push({ title: groupName, content: groupName /*channelsInGroup*/ });
        }
        setAccordionDataArray(accordionDataArrayTmp);
        console.log(accordionDataArray);
    };

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

    const renderAccordionContent = (content) => {
        return (
            <FlatList
                data={content}
                renderItem={({ item }) => {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={{ uri: item["icon_url"] }}
                                style={{ width: 50, height: 50 }}
                            />
                            <Text>{item["title"]}</Text>
                        </View>
                    );
                }
                }
                keyExtractor={item => item["id"]}
            />
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* <List.Section title="Channels"> */}
                {/* {groupsArrItem} */}
                {/* </List.Section> */}
                <Accordion
                    dataArray={accordionDataArray}
                    expanded={0}
                    // renderContent={renderAccordionContent}
                />
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