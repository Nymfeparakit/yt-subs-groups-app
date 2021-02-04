import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import ChannelRect from '../components/ChannelRect'
import Faker from 'faker'
import { AntDesign } from '@expo/vector-icons'


const ChannelsListScreen = ({ navigation }) => {

    const [channels, setChannels] = useState([])
    //const [selectedId, setSelectedId] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])

    const renderItem = ({ item, index}) => {
        //const backgroundColor = index === selectedId ? "#f9c2ff" : "#6e3b6e"
        const backgroundColor = selectedIds.includes(index) ? "#f9c2ff" : "#6e3b6e"
        
        const onPress = (index) => {
            selectedIds.includes(index) 
            ? setSelectedIds(selectedIds.filter(item => item !== index)) 
            : setSelectedIds([...selectedIds, index])
            //setSelectedId(index)
        }

        return (
            <ChannelRect
                id={index}
                style={{ backgroundColor }}
                onPress={() => onPress(index)}
                title={item["title"]}
                icon_url={item["icon_url"]}
            />)
    }

    useEffect(() => {
        // fetch('http://a3c81782cb7f.ngrok.io')
        // .then(response => response.json())
        // .then((data) => {
        //     console.log(data)
        //     setChannels(data)
        // })
        tmpChannels = [];
        for (var i = 0; i < 10; ++i) {
            tmpChannels.push({
                'title': Faker.name.findName(),
                'icon_url': Faker.image.cats()
            })
        }
        setChannels(tmpChannels);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={channels}
                renderItem={renderItem}
                keyExtractor={item => item["title"]}
            />
            {
                typeof selectedIds !== 'undefined' && selectedIds.length > 0 ?
                <TouchableOpacity 
                    style={styles.bottomButton}
                    onPress={() => navigation.navigate('Choose group')}>
                    <AntDesign name="pluscircle" size={24} color="black" />
                </TouchableOpacity>
                : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 50,
        flex: 1,
        justifyContent: 'space-between'
    },
    list: {
        height: '60%'
    },
    bottomButton: {
        flex: 1,
        alignSelf: 'center'
    }
})

export default ChannelsListScreen;