import { View, Text } from 'react-native'
import React from 'react'
import HeaderMenu from '../components/HeaderMenu'
import Footer from '../components/Footer'

export default function History() {
  return (
    <View style={{flex:1}}>
      <HeaderMenu name={"History"} />

      <Footer />

    </View>
  )
}

