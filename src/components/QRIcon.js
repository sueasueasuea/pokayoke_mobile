import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function QRIcon({qrData}) {
    return (
        <View style={{flex:1,borderWidth:1,flexDirection:'row',alignItems:'center'}}>
            <Icon name={"qrcode"} size={50}></Icon>
            <Text>{qrData}</Text>
        </View>
    )
}

export default QRIcon