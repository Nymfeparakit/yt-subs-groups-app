import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

const GroupRect = (/*{ onPress }*/) => {
    return (
        <TouchableWithoutFeedback>
            <View flexDirection="row">
                <Text>Group name</Text>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default GroupRect;