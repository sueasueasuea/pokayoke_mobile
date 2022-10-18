import {
  View,
  Image,
  Text,
} from 'react-native'
import axios from 'axios';
const baseUrl = 'https://asvanmfg02.siamkubota.co.th/pokayoke';
const sslBaseUrl = 'https://asvanmfg02:444/pokayoke'
const userCenUrl = 'https://p701apsi01-la01skc.azurewebsites.net/skcapi'


// Passing configuration object to axios
const fetchToken = async () => {
  const configurationObject = {
    method: 'post',
    url: `${userCenUrl}/token`,
    data: {
      "UserName": USER_DB_USERNAME,
      "Password": USER_DB_PASSWORD
    }
  };
  axios(configurationObject).then((response) => {
    console.log(JSON.stringify(response.data));
  }).catch((err) => {
    console.log(JSON.stringify(err));
  })

};

const agent = new https.Agent({
  rejectUnauthorized: false,
  
}); 

const fetchItemConfig = async () => {
  const configurationObject = {
    method: 'get',
    url: `${sslBaseUrl}/itemconfig`,
    httpsAgent:agent
  };
  axios(configurationObject).then((response) => {
    console.log(JSON.stringify(response.data));
  }).catch((err) => {
    console.log(JSON.stringify(err));
  })

};


const fetchUser = async () => {
  const configurationObject = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUG9rYXlva2UiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY2NjA5MTU0MywiaXNzIjoiaHR0cHM6Ly9wNzAxYXBzaTAxLWxhMDFza2MuYXp1cmV3ZWJzaXRlcy5uZXQiLCJhdWQiOiJodHRwczovL3A3MDFhcHNpMDEtbGEwMXNrYy5henVyZXdlYnNpdGVzLm5ldCJ9._UL_8fAYTrMyPN2Q0550MX974hJ_sVBzuIOpBkFb8r0',
    },
    method: 'post',
    url: `${userCenUrl}/empsearch`,
    data: {
      "Keyword":"425BB409"
    }
  };
  axios(configurationObject).then((response) => {
    console.log(JSON.stringify(response.data));
  }).catch((err) => {
    console.log(JSON.stringify(err));
  })

};

import nfcManager, { NfcEvents } from 'react-native-nfc-manager';

import React, { useState, useEffect } from 'react';
import { customStyles } from '../styles';
import { Button } from 'react-native-paper';

// import axios from '../service/UserCenterAxios';

import { USER_DB_USERNAME, USER_DB_PASSWORD } from '@env'
import { useTokenContext } from '../store/TokenContext';
import { useLoadingContext } from '../store/LoadingContext';
import LoadingFullScreen from '../components/Loading';
// import { fetchUser } from '../service/RestAxios';

export default function LoginByNFC({ navigation }) {
  const [nfcData, setNfcData] = useState();
  const { accessToken, setAccToken } = useTokenContext();
  const { refreshToken, setRefToken } = useTokenContext();
  const { isLoading, setIsLoading } = useLoadingContext();

  async function getTokenUserApi() {

    try {
      setIsLoading(true)
      const { data } = await axios
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
      const { data } = await axios({
        // url of the api endpoint (can be changed)
        url: `/empsearch`,
        method: "POST",
        data: {
          "Keyword": id
        },
      })

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
    fetchToken()
    fetchUser()
    fetchItemConfig()
    //getTokenUserApi()
  }, [])

  // useEffect(() => {
  //   getProfileUser(nfcData?.id)
  // }, [nfcData])

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
        {nfcData ? <Text>{nfcData?.id ?? "ไม่มี id"}</Text> : null}
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


