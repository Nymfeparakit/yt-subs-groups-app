import React from 'react';
import { Text, TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const GroupRect = ({ title, id, onPress, onLongPress, isSelected, onRemovePress }) => {
    const bgColor = isSelected ? "#E5BDF6" : "#D8DEDE";

    return (
        <TouchableOpacity
        onPress={() => onPress(id)}
        onLongPress={() => onLongPress(id)}>
            <View flexDirection="row" style={[styles.container, {backgroundColor: bgColor}]}>
                <Text style={styles.title}>{ title }</Text>
                {
                    isSelected
                    ? <TouchableOpacity
                        onPress={() => onRemovePress(id)}>
                        <FontAwesome name="trash" size={24} color="black" />
                      </TouchableOpacity>
                    : null
                }
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
        paddingLeft: 20,
        paddingRight: 30,
        justifyContent: "space-between"
    }
});

export default GroupRect;