import {
  View,
  Image,
  Text,
} from 'react-native'
import {UserCenterAxios} from '../service/UserCenterAxios'

import nfcManager, { NfcEvents } from 'react-native-nfc-manager';

import React, { useState, useEffect } from 'react';
import { customStyles } from '../styles';
import { Button } from 'react-native-paper';

import { USER_DB_USERNAME, USER_DB_PASSWORD } from '@env'
import { useTokenContext } from '../store/TokenContext';
import { useLoadingContext } from '../store/LoadingContext';
import { useAuthContext } from '../store/AuthContext';
import LoadingFullScreen from '../components/Loading';


export default function LoginByNFC({ navigation }) {
  const [nfcData, setNfcData] = useState();
  const { accessToken, setAccToken } = useTokenContext();
  const { refreshToken, setRefToken } = useTokenContext();
  const { isLoading, setIsLoading } = useLoadingContext();
  const {userData, setUserData} =useAuthContext();

  async function getTokenUserApi() {

    try {
      setIsLoading(true)
      const { data } = await UserCenterAxios
        .post('/token', {
          "UserName": USER_DB_USERNAME,
          "Password": USER_DB_PASSWORD 
        })
      console.log(JSON.stringify(data));
      setAccToken(data.accessToken)
      setRefToken(data.refreshToken)



    } catch (error) {
      console.log(JSON.stringify(error));
    }
    finally {
      setIsLoading(false)
    }

  }

  async function getProfileUser(id) {
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
      if(data.message === "Not found result"){

      }else {
        console.log('gsfs',data);
        setUserData({
          empNo:temp.eid,name:`${temp.nameTH} ${temp.lastnameTH}`,img:temp.picture_url
      },navigation.navigate('Home',{img:temp.picture_url}))
        
      }
      
      console.log(JSON.stringify(data));




    } catch (error) {
      console.log(JSON.stringify(error));
     
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

  useEffect(() => {
    // fetchToken()
    // fetchUser()
    //fetchItemConfig()
    getTokenUserApi()
  }, [])

  useEffect(() => {
    getProfileUser(nfcData?.id)
  }, [nfcData])

  return (
    <View style={customStyles.loginContainer}>
      <LoadingFullScreen animating={isLoading} text={'waiting...'} />
      <View style={{ flex: 1, alignItems: 'center', }}>

        <Image
          style={{
            flex: 1,
            resizeMode: 'contain'

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
