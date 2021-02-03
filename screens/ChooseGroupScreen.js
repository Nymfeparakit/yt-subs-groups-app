import React, { useEffect, useState } from 'react'
import RadioButton from '../components/RadioButton'
import { FlatList, TouchableOpacity } from 'react-native'
import Faker from 'faker'


const ChooseGroupScreen = () => {

    const [groups, setGroups] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        const tmpGroups = [];
        for (var i = 0; i < 10; ++i) {
            tmpGroups.push({
                'title': Faker.name.findName(),
                'icon_url': Faker.image.cats()
            })
        }
        setGroups(tmpGroups);
    }, []) 

    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity
            onPress={() => setSelectedId(index)}>
                <RadioButton title={item['title']} selected={selectedId === index}/>            
            </TouchableOpacity>
        )
    }

    return (
        <FlatList 
        data={groups}
        keyExtractor={item => item['title']}
        renderItem={renderItem}/>
        // <RadioButton selected={true}/>
    )
}

export default ChooseGroupScreen