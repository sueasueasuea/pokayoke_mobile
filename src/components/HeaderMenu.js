import { View, Text } from 'react-native'
import React from 'react'
import BackButton from './BackButton'
import { customStyles } from '../styles'

const HeaderMenu = ({name}) => {
    return (
        <View style={{...customStyles.HeaderContainer,alignItems: 'center'}}>
            <View style={{ flex: 1, alignItems: 'center'}}>
                <BackButton />
            </View>
            <View style={{flex:4,alignItems: 'center'}}>
                <Text style={{...customStyles.regularTextStyle,color:'white'}}>{name}</Text>
            </View>
            <View style={{flex:1}}></View>
        </View>
    )
}

export default HeaderMenu