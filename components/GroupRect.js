import React from 'react';
import { Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';

const GroupRect = ({ title, id, onPress }) => {
    return (
        <TouchableOpacity
        onPress={() => onPress(id)}>
            <View flexDirection="row">
                <Text>{ title }</Text>
            </View>
        </TouchableOpacity>
    )
};

export default GroupRect;