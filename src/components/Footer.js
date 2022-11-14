import React from 'react'
import { View, Text } from 'react-native'
import { customStyles } from '../styles'

function Footer() {
    return (
        <View style={customStyles.footerContainer}>
            
            <Text style={{ ...customStyles.regularTextStyle,color: 'white' }}>Copyright© 2022 Siam Kubota. All rights reserved.</Text>
        </View>
    )
}

export default Footer