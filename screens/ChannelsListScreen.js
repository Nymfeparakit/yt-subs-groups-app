import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text, Touchable } from 'react-native'
import Faker from 'faker'
import { AntDesign } from '@expo/vector-icons'
import { getChannels } from '../data/ApiHelper'
import { ActivityIndicator } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { Accordion } from 'native-base';
import { useIsFocused } from '@react-navigation/native'

const ChannelsListScreen = ({ navigation }) => {

    const [channels, setChannels] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [expanded, setExpanded] = useState(true)
    const [accordionDataArray, setAccordionDataArray] = useState([]);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);

    const handlePress = () => setExpanded(!expanded)

    const onChannelPress = (channelId) => {
        if (selectedIds.indexOf(channelId) >= 0) {
            setSelectedIds(selectedIds.filter(item => item != channelId))
        } else {
            setSelectedIds([...selectedIds, channelId]);
        }
    };

    const successCallback = (fetchedChannels) => {
        console.log("set channels");
        setChannels(fetchedChannels);
        setLoading(false);

    };

    useEffect(() => {
        setLoading(true);
        getChannels()
            .then(successCallback)
            .catch(err => console.log("failed with promise again: " + err.message));
        setSelectedIds([]);
        // tmpChannels = [];
        // for (var i = 0; i < 10; ++i) {
        //     tmpChannels.push({
        //         'title': Faker.name.findName(),
        //         'icon_url': Faker.image.cats()
        //     })
        // }
        // setChannels(tmpChannels);
    }, [isFocused]); // fetch data every time screen is focused again

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
    }, [channels, selectedIds]);

    const renderAccordionContent = ( content ) => {
        return (
            <FlatList
                data={content}
                renderItem={({ item }) => {
                    const channelBgColor = selectedIds.indexOf(item["id"]) >= 0 ? "#E5BDF6" : "#D8DEDE";

                    return (
                        <TouchableOpacity
                        onPress={() => onChannelPress(item["id"])}
                        >
                        <View style={[{backgroundColor: channelBgColor}, styles.channelView]}>
                        {/* <View style={styles.channelView}> */}
                            <Image
                                source={{ uri: item["icon_url"] }}
                                style={{ width: 50, height: 50 }}
                            />
                            <Text>{item["title"]}</Text>
                        </View>
                        </TouchableOpacity>
                    );
                }
                }
                keyExtractor={item => item["id"]}
                extraData={selectedIds}
            />
        );
    };

    const renderAccordionHeader = (title) => {
        return (
            <Text style={styles.headerText}>{title}</Text>
        );
    };

    return (
        <View style={styles.container}>
            {
                loading 
                ? <ActivityIndicator size="large" />
                : <ScrollView>
                    <Accordion
                        dataArray={accordionDataArray}
                        expanded={[-1]}
                        renderContent={(accordionDataArray) => renderAccordionContent(accordionDataArray.content)}
                        renderHeader={(accordionDataArray) => renderAccordionHeader(accordionDataArray.title)}
                    />
                </ScrollView>
            }       
            {
                !loading && typeof selectedIds !== 'undefined' && selectedIds.length > 0 ?
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={() => {
                            navigation.navigate('Choose group', { channelsIds: selectedIds });
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
    },
    headerText: {
        fontSize: 18,
        paddingVertical: 10,
        paddingLeft: 5,
        borderBottomWidth: 1
    },
    channelView: {
        flexDirection: 'row',
    }
})

export default ChannelsListScreen;