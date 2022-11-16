
import React from 'react'
import HeaderMenu from '../components/HeaderMenu'
import Footer from '../components/Footer'
import Content from '../components/Content'
import { choices } from '../constants/Menu'
import {View} from 'react-native'

function SSChocie({navigation}) {
    return (
        <View style={{flex:1}}>
            <HeaderMenu name={"Scanning Choice"}/>
            <Content menus={choices} navigation={navigation} />
            <Footer />
        </View>
    )
}

export default SSChocie