import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { createNewFeed } from '../data/ApiHelper'

const CreateNewGroupScreen = () => {

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