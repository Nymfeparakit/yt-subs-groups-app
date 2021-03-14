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

    useEffect(() => {
        var accordionDataArrayTmp = [];
        for (var groupName in channels) {
            console.log("group name: " + groupName);
            const channelsInGroup = channels[groupName];
            if (channelsInGroup.length == 0) {
                continue;
            }
            accordionDataArrayTmp.push({ title: groupName.toString(), content: /*groupName*/ channelsInGroup });
        }
        setAccordionDataArray(accordionDataArrayTmp);
        console.log("accordion data array was set");
    }, [channels]);

    // useEffect(() => {
    //     console.log(accordionDataArray);
    // }, [accordionDataArray]);

    const renderAccordionContent = ( content ) => {
        for (var key in content) {
            console.log('Key in content: ' + key);
        }
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
            // <Text>some text</Text>
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
                    expanded={[0]}
                    renderContent={(accordionDataArray) => renderAccordionContent(accordionDataArray.content)}
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