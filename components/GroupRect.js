import React from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const GroupRect = (onPress) => {
    return (
        <TouchableWithoutFeedback>
            <View flexDirection="horizontal">
                <Text>Group name</Text>
                <AntDesign name="rightcircle" size={24} color="black" />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default GroupRect