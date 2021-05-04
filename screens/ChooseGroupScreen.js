import React, { useEffect, useState } from 'react'
import RadioButton from '../components/RadioButton'
import { FlatList, TouchableOpacity, Button, View, StyleSheet, Text } from 'react-native'
import Faker from 'faker'
import { addChannelToGroup, getGroups } from '../data/ApiHelper'
import { OTHER_GROUP_ID } from '../constants/Constants'


const ChooseGroupScreen = ({ route, navigation: { goBack } }) => {

    const { channelsIds } = route.params

    const [groups, setGroups] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        // const tmpGroups = [];
        // for (var i = 0; i < 10; ++i) {
        //     tmpGroups.push({
        //         'title': Faker.name.findName(),
        //         'icon_url': Faker.image.cats()
        //     })
        // }
        // setGroups(tmpGroups);
        getGroups().then(groups => setGroups([...groups, {"name": "Other", "id": OTHER_GROUP_ID}]));
    }, [])

    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity
                onPress={() => setSelectedId(item['id'])}>
                <RadioButton title={item['name']} selected={selectedId === item['id']} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={groups}
                keyExtractor={item => item['name']}
                renderItem={renderItem} />
            {
                selectedId ?
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                            channelsIds.map(channelId => addChannelToGroup(channelId, selectedId));
                            goBack();
                        }
                        }>
                        <Text>ADD TO GROUP</Text>
                    </TouchableOpacity>
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    addButton: {
        alignSelf: 'center'
    }
})

export default ChooseGroupScreen