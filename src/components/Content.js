import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { customStyles } from '../styles'

function Content({title,content}) {
    return (
        <View style={customStyles.contentContainer}>
            <Text>{title}</Text>
            <Text>{content}</Text>

        </View>
    )
}

export default Content