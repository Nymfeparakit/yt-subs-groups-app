import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { createNewFeed } from '../data/ApiHelper'

const CreateNewGroupScreen = () => {

    // const createFeed = (newFeed) => {
    //     fetch('http://c3dce0184757.ngrok.io/feeds/', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json' 
    //         },
    //         body: JSON.stringify({'name': newFeed})
    //     }).then(response => response.json())
    //     .then(data => console.log("posted new feed"))
    // }

    const [groupName, setGroupName] = useState('')

    return (
        <View>
            <Text>Name:</Text>
            <TextInput 
            // onSubmitEditing={(event) => createFeed(event.nativeEvent.text)}
            onSubmitEditing={(event) => createNewFeed(event.nativeEvent.text)}
            />
        </View>
    )

}

export default CreateNewGroupScreen;