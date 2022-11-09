import { View, TextInput, Text, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
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
import { DATA } from '../constants/DataHeader'
import { toDate } from '../helpers/ToDate'
import Table from 'react-native-simple-table'
import SweetAlert from 'react-native-sweet-alert-best';
import { playSound } from '../helpers/playSound';

function Scanning({ navigation }) {

  const { choice } = useChoiceContext()
  const [temp, setTemp] = useState('')
  const { setIsLoading } = useLoadingContext();
  //qrData1 and qrData2 for showing on QrComponent
  const [qrData1, setQrData1] = useState('waiting to scan...')
  const [qrData2, setQrData2] = useState('waiting to scan...')
  //exp for ItemNoConfig {itemNoLength: 0, locationEndSubstring: 0, locationStartSubstring: 0, tagEndSubstring: 0, tagStartSubstring: 0 }
  const [itemNoConfig, setItemNoConfig] = useState(null)

  const [fullLengthQR, setFullLengthQR] = useState(61)
  const [locationConfig, setLocationConfig] = useState({ startCh: "#", endCh: "#" })
  const { userData } = useAuthContext()
  const [qrData1NoCut, setQr1Nocut] = useState('')
  const [qrData2NoCut, setQr2Nocut] = useState('')
  const Input = useRef();
  const [transac, setTransac] = useState(null)
  useEffect(() => {
    getItemNoConfig()
    getLastScanned()

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
    console.log('+' + qrData1 + '+' + qrData2);
    if (qrData1 !== 'waiting to scan...' && qrData2 != 'waiting to scan...') {
      //mix
      if (qrData1 === "9999999999") {
        typeHandler("mix")
      } else {
        //single
        typeHandler("single")
      }
    }
  }

  useEffect(() => {
    toCallAPI()
  }, [qrData1, qrData2])

  function qrProcess() {
    //location QR
    console.log('temp :' + temp + 'length : ' + temp.length);
    console.log(temp[0], temp[temp.length - 1]);
    if (temp.length < fullLengthQR) {
      //check for sure that QR is not null and not undefine
      if (temp) {

        if (temp[0] === locationConfig.startCh && temp[temp.length - 1] === locationConfig.endCh) {

          let afterTrim = temp.replace(/#/g, "")
          setQr2Nocut(afterTrim)
          setQrData2(afterTrim)
          console.log('do locationQR mix');
        }
        else {
          setQr2Nocut(temp)
          let transQR = transform(temp, "location")
          setQrData2(transQR)
          console.log('do locationQR single');
        }
      }
      //tag QR
    } else if (temp.length == fullLengthQR) {

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

      if (status === 'NG') {
        playSound("NG")
        SweetAlert.showAlertWithOptions({
          title: status,
          subTitle: 'ผิด Location',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'error',
          cancellable: true
        },
          callback => console.log('NG from single'));
      }

      else if (status === 'OK') {
        playSound("OK")
        SweetAlert.showAlertWithOptions({
          title: status,

          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'success',
          cancellable: true
        },
          callback => console.log('OK from single'));
      }


      getLastScanned()
      setQrData1('waiting to scan...')
      setQrData2('waiting to scan...')

    } catch (error) {
      console.log(JSON.stringify(error));
    }
    finally {
      setIsLoading(false)
    }
  }
  async function mixApi() {
    try {
      setIsLoading(true)
      const { data } = await RestAxios
        .post('/mix', {
          "resultStatus": "MIX",
          "qrTag": qrData1NoCut,
          "qrLocation": qrData2NoCut,
          "createdBy": userData.empNo,
          "tagItemNo": qrData1,
          "locationItemNo": qrData2,
          "actionType": choice.SS
        })
      console.log(JSON.stringify(data));

      if (data.OK) {
        playSound("OK")
        SweetAlert.showAlertWithOptions({
          title: 'OK',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'success',
          cancellable: true
        },
          callback => console.log('OK from mix'));
      }
      getLastScanned()
      setQrData1('waiting to scan...')
      setQrData2('waiting to scan...')

    } catch (error) {
      console.log(JSON.stringify('mix error' + error.message));

    }
    finally {
      setIsLoading(false)
    }
  }

  async function getLastScanned() {
    try {
      setIsLoading(true)
      const { data } = await RestAxios(
        {
          url: `/lasttop10byscanner`,
          method: "POST",
          data: {
            "createdBy": userData.empNo
          }
        })
      console.log(JSON.stringify(data));
      setTransac(data)



    } catch (error) {
      console.log(JSON.stringify(error));
    }
    finally {
      setIsLoading(false)
    }
  }




  return (

    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <View style={customStyles.HeaderContainer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{}}>
            <Icon name='keyboard-backspace' size={25} />
            
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', padding: '2%' }}>
          <TextInput style={{ backgroundColor: 'white' }} ref={Input} autoFocus={true} onChangeText={text => { setTemp(text) }} value={""} blurOnSubmit={false} onSubmitEditing={() => { qrProcess(), Input.current.focus() }} />
        </View>
        <View style={{ flex: 1 ,justifyContent: 'center' ,alignItems:'center'}}><Text>{choice.SS}</Text></View>
      </View>
      <View style={{
        flex: 8,
        backgroundColor: "#D1E2C4",


      }}>



        <QRIcon qrData={qrData1} qrName={"Tag"}/>
        <QRIcon qrData={qrData2} qrName={"Lo"}/>
        <View style={{
          flex: 6,
          padding: '2%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          {transac ? <Table height={320} columnWidth={60} columns={DATA} dataSource={transac} /> : <Text>There is no data</Text>}



        </View>
      </View>
      <Footer />
    </KeyboardAvoidingView>

  )
}

export default Scanning
