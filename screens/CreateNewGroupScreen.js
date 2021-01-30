import React, { useState } from 'react'
import { TextInput } from 'react-native'

const CreateNewGroupScreen = () => {

    const [groupName, setGroupName] = useState('')

    return (
        <TextInput 
        onSubmitEditing={({text}) => setGroupName(text)}/>
    )

}

export default CreateNewGroupScreen;