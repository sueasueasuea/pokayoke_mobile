import { View, Text, } from 'react-native'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Content from '../components/Content'
import { menus } from '../constants/Menu'

export default function Home({route
,navigation}) {
  const {img} = route.params;
  return (
    <View style={{flex:1}}>
      
      
      <Header img={img} navigation={navigation}/>
      <Content menus={menus}/>
      
      <Footer/>
    </View>
  )
}