import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {customStyles} from '../styles'

function QRIcon({qrData,qrName}) {
    return (
        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Icon name={"qrcode"} size={25}></Icon>
            <Text style={customStyles.regularTextStyle}> {qrName} : {qrData}</Text>
        </View>
    )
}

export default QRIcon