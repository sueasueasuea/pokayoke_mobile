import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'

import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';
import nfcManager, { NfcEvents } from 'react-native-nfc-manager';

import React, { useState, useEffect } from 'react';
import { customStyles } from '../styles';
import { Button } from "@react-native-material/core";



export default function LoginByNFC({ navigation }) {
  const [nfcData, setNfcData] = useState();
  const [typeLogin, setTypeLogin] = useState('nfc');

  useEffect(() => {
    nfcManager.isSupported().then(supported => {
      if (supported) {
        nfcManager.start();
        nfcManager.registerTagEvent();
      } else {
        setNfcData('NFC not supported');
      }
    })
    nfcManager.unregisterTagEvent();
  }, [])

  useEffect(() => {
    nfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      setNfcData(tag);
    });
    nfcManager.setEventListener(NfcEvents.DiscoverBackgroundTag, tag => {
      setNfcData(tag);
    });
  }, [nfcManager])



  return (
    <View style={customStyles.loginContainer}>

      <View style={{ flex: 1, alignItems: 'center' ,}}>

        <Image
          style={{
            flex:1,
            resizeMode:'contain'

          }}
          source={require('../assets/icons/icon.png')}
        />
        
      </View>
      <View style={{ flex: 1 ,alignItems: 'center'}}>
        <Text style={{ ...customStyles.header2TextStyle, marginTop: '5%', marginBottom: '5%' }}>สแกนบัตรพนักงาน</Text>

        <Button onPress={() => navigation.navigate('LoginByID')} style={{}} variant='outlined' title={'เข้าสู่ระบบ'} color='black' titleStyle={customStyles.regularTextStyle} />
      </View>
      <View style={{ flex: 3, }}>

        <Image
          style={{

            height: '100%',
            width: '100%'
          }}
          source={require('../assets/images/giphy.webp')}
        />
      </View>




    </View>
  )






}

//<Content title={"NFC Tag ID"} content={nfcData?.id?? "No tag id or No Tag scanning"} />
//


