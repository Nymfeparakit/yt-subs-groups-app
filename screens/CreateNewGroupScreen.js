import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import { createNewFeed } from '../data/ApiHelper'

const CreateNewGroupScreen = ({ navigation: { goBack } }) => {

    const [groupName, setGroupName] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.nameLbl}>Name:</Text>
            <TextInput 
            // onSubmitEditing={(event) => createFeed(event.nativeEvent.text)}
            onSubmitEditing={(event) => {
                createNewFeed(event.nativeEvent.text).then(() => goBack());
            }}
            style={styles.nameInput}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    nameLbl: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    nameInput: {
        fontSize: 20,
        paddingBottom: 8,
        borderBottomWidth: 1
    }
});

export default CreateNewGroupScreen;