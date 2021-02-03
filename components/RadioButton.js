import React from 'react'
import { View, StyleSheet, Text } from 'react-native'


const RadioButton = ({ selected, title }) => {

    // console.log(props)
    // console.log(props.selected)

    return (
        <View flexDirection="row">
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }]}>
                {
                    selected ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>
            <Text>{title}</Text>
        </View>
    )
}

export default RadioButton