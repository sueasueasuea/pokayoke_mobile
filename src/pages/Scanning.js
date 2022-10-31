import { View, TextInput, Text } from 'react-native'
import React, { useState, useEffect,useRef } from 'react'
import { useChoiceContext } from '../store/ChoiceContext';
import { customStyles } from '../styles';
import Footer from '../components/Footer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RestAxios } from '../service/RestAxios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import QRIcon from '../components/QRIcon';
import { useLoadingContext } from '../store/LoadingContext';
import { useAuthContext } from '../store/AuthContext'

function Scanning({ navigation }) {
  const { choice } = useChoiceContext()
  const [temp,setTemp] = useState('')
  const { setIsLoading } = useLoadingContext();
  //qrData1 and qrData2 for showing on QrComponent
  const [qrData1, setQrData1] = useState('waiting to scan...')
  const [qrData2, setQrData2] = useState('waiting to scan...')
  //exp for ItemNoConfig {itemNoLength: 0, locationEndSubstring: 0, locationStartSubstring: 0, tagEndSubstring: 0, tagStartSubstring: 0 }
  const [itemNoConfig, setItemNoConfig] = useState(null)
  //exp for locationConfig {locationLength: 0,startChar: "w"  }
  const [fullLengthQR, setFullLengthQR] = useState(61)
  const { userData } = useAuthContext()
  const [qrData1NoCut, setQr1Nocut] = useState('')
  const [qrData2NoCut, setQr2Nocut] = useState('')
  useEffect(() => {
    getItemNoConfig()
  }, [])


  async function getItemNoConfig() {
    try {
      setIsLoading(true)
      const { data } = await RestAxios
        .get('/itemconfig')
      console.log(JSON.stringify(data));
      setItemNoConfig(data[0])



    } catch (error) {
      console.log(JSON.stringify(error));
    }
    finally {
      setIsLoading(false)
    }
  }
  function toCallAPI() {
    // already scan both QR
    console.log('+'+qrData1+'+'+qrData2);
    if (qrData1 !== 'waiting to scan...' && qrData2 != 'waiting to scan...')
    {
      //mix
      if (qrData1 === "9999999999")
      {
        typeHandler("mix")
      }else{
        //single
        typeHandler("single")
      }
    }
  }

  useEffect(() => {
    toCallAPI()
  }, [qrData1,qrData2])
  
  function qrProcess() {
    //location QR
    console.log(''+temp.charAt(0)+"wtf :"+fullLengthQR);
    if (temp.length !== fullLengthQR) {
      
      setQr2Nocut(temp)
      let transQR = transform(temp, "location")
      setQrData2(transQR)
      console.log('do locationQR');
    } else {
      //tag QR
      setQr1Nocut(temp)
      let transQR = transform(temp, "tag")
      setQrData1(transQR)
      console.log('do tagQR');
    }
    
  }
  function transform(qrData, type) {
    if (type === "tag") {
      return qrData.substring(itemNoConfig.tagStartSubstring - 1, itemNoConfig.tagEndSubstring)
    }
    else if (type === "location") {
      return qrData.substring(itemNoConfig.locationStartSubstring - 1, itemNoConfig.locationEndSubstring)
    }

  }

  function IsMatched(str1, str2) {
    console.log('str1:' + str1 + 'str2:' + str2);
    if (str1 === str2) {
      singleApi("OK")
    } else {
      singleApi("NG")
    }
  }

  function typeHandler(type) {
    //if it is not mix part
    if (type === "single") {
      IsMatched(qrData1, qrData2)


    } else if (type === "mix") {
      mixApi()
    }
  }
  async function singleApi(status) {
    try {
      setIsLoading(true)
      const { data } = await RestAxios
        .post('/single', {
          "resultStatus": status,
          "qrTag": qrData1NoCut,
          "qrLocation": qrData2NoCut,
          "createdBy": userData.empNo,
          "tagItemNo": qrData1,
          "locationItemNo": qrData2,
          "actionType": choice.SS
        })
      console.log(JSON.stringify(data));




    } catch (error) {
      console.log(JSON.stringify(error));
    }
    finally {
      setIsLoading(false)
    }
  }
  function mixApi() {
    console.log('mix part for sure!!!');
  }


  return (

    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={customStyles.HeaderContainer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ borderWidth: 2 }}>
            <Icon name='keyboard-backspace' size={25}>
            </Icon>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4, borderWidth: 2, justifyContent: 'center' }}>
          <TextInput ref={"qr"} returnKeyType={"next"} autoFocus={true} onChangeText={text => setTemp(text)} value={""} blurOnSubmit={false} onSubmitEditing={(event) =>{qrProcess(),refs.Address.focus();}} />
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={customStyles.contentContainer}>
        <Text>Current Type : {choice.BR}, {choice.SS}</Text>

        <QRIcon qrData={qrData1} />
        <QRIcon qrData={qrData2} />

      </View>
      <Footer />
    </KeyboardAwareScrollView>

  )
}

export default Scanning