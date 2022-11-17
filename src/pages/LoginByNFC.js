import {
  View,
  Image,
  Text,
} from 'react-native'
import { UserCenterAxios } from '../service/UserCenterAxios'
import { APP_VERSION } from '@env'
import nfcManager, { NfcEvents } from 'react-native-nfc-manager';

import React, { useState, useEffect } from 'react';
import { customStyles } from '../styles';
import { Button } from 'react-native-paper';

import { USER_DB_USERNAME, USER_DB_PASSWORD } from '@env'

import { useLoadingContext } from '../store/LoadingContext';
import { useAuthContext } from '../store/AuthContext';
import LoadingFullScreen from '../components/Loading';
import SweetAlert from 'react-native-sweet-alert-best';


export default function LoginByNFC({ navigation }) {
  const [nfcData, setNfcData] = useState();
  
 
  const { isLoading, setIsLoading } = useLoadingContext();
  const { userData, setUserData } = useAuthContext();

  

  

  async function getProfileUser(id) {
    console.log('id :' + id);
    if (!id) {
      return;
    }
    try {
      setIsLoading(true)
      const { data } = await UserCenterAxios({
        // url of the api endpoint (can be changed)
        url: `/empsearch`,
        method: "POST",
        data: {
          "Keyword": `${id}`
        },

      })
      let temp = data[0]
      if (data.message === "Not found result") {
        SweetAlert.showAlertWithOptions({
          title: "Error",
          subTitle: 'Not found result!',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'error',
          cancellable: true
        },
          callback => console.log('Not found result'));
      } else {
        console.log('data from rfid search api ', data);
        SweetAlert.showAlertWithOptions({
          title: 'OK',
          subTitle: 'Login success!',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'success',
          cancellable: true
        },
          callback => console.log('Login NFC suc'));
        let plant_temp = ''
        if (temp.workAreaID === "SKCA") {
          plant_temp = "81"
        }
        if (temp.workAreaID === "HEA01") {
          plant_temp = "95"
        }
        
        setUserData({
          empNo: temp.eid, name: `${temp.nameTH} ${temp.lastnameTH}`, img: temp.picture_url, plant: plant_temp
        }, navigation.reset({index: 0, routes:[{name :'Home'}]}))

      }

      console.log(JSON.stringify(data));




    } catch (error) {
      console.log('get Profile error:' + error);

    }
    finally {
      setIsLoading(false)

    }
  }



  useEffect(() => {
    nfcManager.isSupported().then(supported => {
      if (supported) {
        nfcManager.start();
        nfcManager.registerTagEvent();
      } else {
        //setNfcData('NFC not supported');
        console.log('NFC not Supported');
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

  useEffect(() => {
    
    
  }, [])

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;

    getProfileUser(nfcData?.id)
    // return () => {controller.abort()}


  }, [nfcData])

  return (
    <View style={customStyles.loginContainer}>
      <LoadingFullScreen animating={isLoading} text={'waiting...'} />
      <View style={{ flex: 1, }}>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={{ ...customStyles.regularTextStyle, }}>v {APP_VERSION}</Text>
        </View>

        <Image
          style={{
            flex: 4,
            resizeMode: 'contain',

            alignSelf: 'center'
          }}
          source={require('../assets/icons/icon.png')}
        />


      </View>


      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ ...customStyles.header2TextStyle, marginTop: '5%', marginBottom: '5%' }}>สแกนบัตรพนักงาน</Text>

        <Button onPress={() => navigation.navigate('LoginByID')} style={{}} mode='outlined' color='black' titleStyle={customStyles.regularTextStyle} >
          เข้าสู่ระบบด้วยเลขพนักงาน
        </Button>

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

//{nfcData ? <Text>{nfcData?.id ?? "ไม่มี id"}</Text> : null}
