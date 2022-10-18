import { View, Text } from 'react-native'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Content from '../components/Content'


export default function Home({id}) {
  return (
    <View>
      <Header title={"NFC data"}/>
      <Content title={"id"} content={id}/>
      <Footer/>
    </View>
  )
}