import React, { useEffect, useState } from 'react'
import RadioButton from '../components/RadioButton'
import { FlatList, TouchableOpacity, Button, View, StyleSheet } from 'react-native'
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
        console.log("groups: \n" + groups)
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
                <Button 
                style={styles.addButton} 
                title="ADD TO GROUP"
                onPress={addChannelToGroup(channels[0]['id'], selectedId)}></Button>
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
    // list: {

    // },
    addButton: {
        alignSelf: 'center'
    }
})

export default ChooseGroupScreen