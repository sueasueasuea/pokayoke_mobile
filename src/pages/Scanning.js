import { View, TextInput, Text } from 'react-native'
import React, { useState } from 'react'
import { useChoiceContext } from '../store/ChoiceContext';
import { customStyles } from '../styles';
import Footer from '../components/Footer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import QRIcon from '../components/QRIcon';

function Scanning({ navigation }) {
  const { choice } = useChoiceContext()
  const [first,setFirst] = useState(true)
  const[temp,setTemp] = useState('');
  const [qrData1,setQrData1] = useState('waiting to scan...')
  const [qrData2,setQrData2] = useState('waiting to scan...')
  function qrProcess()
  {
    if (first === true)
    {
      setQrData1(temp)
      setFirst(false)
     
    }else{
      setQrData2(temp)
      
      setFirst(true)
    }
    setTemp('')
  }
  function checkIsItMix() 
  {

  }
  function singleApi()
  {

  }
  function mixApi()
  {

  }


  return (
   
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={customStyles.HeaderContainer}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{ borderWidth: 2 }}>
              <Icon name='keyboard-backspace' size={25}>
              </Icon>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 4, borderWidth: 2, justifyContent:'center' }}>
            <TextInput autoFocus onChangeText={text => setTemp(text)} value={temp} blurOnSubmit={false} onSubmitEditing={()=>qrProcess()}></TextInput>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={customStyles.contentContainer}>
          <Text>Currently Location : {choice.BR}, {choice.SS}</Text>
          
          <QRIcon qrData={qrData1} />
          <QRIcon qrData={qrData2} />

        </View>
        <Footer />
      </KeyboardAwareScrollView>

  )
}

export default Scanning