import React from 'react'
import { View, Text } from 'react-native'
import { customStyles } from '../styles'

function Header({ title }) {
    return (
        <View style={customStyles.HeaderContainer}>
            <Text >{title}</Text>
        </View>
    )
}

export default Header


