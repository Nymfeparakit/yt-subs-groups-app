import React from 'react';
import { Text, TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet } from 'react-native';

const GroupRect = ({ title, id, onPress }) => {
    return (
        <TouchableOpacity
        onPress={() => onPress(id)}>
            <View flexDirection="row" style={styles.container}>
                <Text style={styles.title}>{ title }</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    container: {
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingLeft: 5
    }
});

export default GroupRect;