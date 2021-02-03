import React from 'react'
import { View, StyleSheet, Text } from 'react-native'


const RadioButton = ({ selected, title }) => {

    // console.log(props)
    // console.log(props.selected)

    return (
        <View style={styles.container} flexDirection="row">
            <View style={[{
                marginHorizontal: 5,
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

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
})

export default RadioButton