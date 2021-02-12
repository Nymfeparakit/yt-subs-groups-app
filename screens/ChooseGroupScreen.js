import React, { useEffect, useState } from 'react'
import RadioButton from '../components/RadioButton'
import { FlatList, TouchableOpacity, Button, View, StyleSheet, Text } from 'react-native'
import Faker from 'faker'
import { addChannelToGroup, getGroups} from '../data/ApiHelper'


const ChooseGroupScreen = ({ route }) => {

    const { channels } = route.params

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
        getGroups().then(groups => setGroups(groups))
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
                    channels.map(channel => addChannelToGroup(channel['id'], channel['title'], selectedId))
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