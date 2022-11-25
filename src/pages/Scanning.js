import { View, TextInput, Text, KeyboardAvoidingView, Platform, } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useChoiceContext } from '../store/ChoiceContext';
import { customStyles } from '../styles';
import Footer from '../components/Footer';
import { RestAxios } from '../service/RestAxios';

import QRIcon from '../components/QRIcon';
import { useLoadingContext } from '../store/LoadingContext';
import { useAuthContext } from '../store/AuthContext'
import { DATA } from '../constants/DataHeader'

import SweetAlert from 'react-native-sweet-alert-best';
import { playSound } from '../helpers/playSound';
import { sharpRegex } from '../constants/Regex';
import BackButton from '../components/BackButton';
import { delay } from '../constants/alertTimeout';
import MyTable from '../components/MyTable';

function Scanning() {


  const { choice } = useChoiceContext()

  const [temp, setTemp] = useState('')
  const { setIsLoading } = useLoadingContext();
  //qrData1 and qrData2 for showing on QrComponent
  const [qrData1, setQrData1] = useState('waiting to scan...')
  const [qrData2, setQrData2] = useState('waiting to scan...')
  //exp for ItemNoConfig {itemNoLength: 0, locationEndSubstring: 0, locationStartSubstring: 0, tagEndSubstring: 0, tagStartSubstring: 0 }
  const [itemNoConfig, setItemNoConfig] = useState(null)

  //const [fullLengthQR, setFullLengthQR] = useState(61)
  //const [locationConfig, setLocationConfig] = useState({ startCh: "#", endCh: "#" })
  const { userData } = useAuthContext()
  const [qrData1NoCut, setQr1Nocut] = useState('')
  const [qrData2NoCut, setQr2Nocut] = useState('')
  const Input = useRef();
  const [transac, setTransac] = useState(null)
  useEffect(() => {
    getItemNoConfig()
    getLastScanned()

  }, [])

  useEffect(() => {
    qrProcess()
  }, [temp])

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

    console.log('temp :' + temp + 'length : ' + temp.length);
    console.log(temp.substring(0, 2) + "");
    //tag QR
    if (temp.substring(0, 2) === userData.plant) {

      setQr1Nocut(temp)
      let transQR = transform(temp, "tag")
      setQrData1(transQR)
      console.log('do tagQR');
      //wrong plant QR
      //I would like to use temp.substring(0, 2) !==userData.plant instead,But it will cause an error,if there is another plant we don't know such as "85"
    } else if (temp.substring(0, 2) === "81" || temp.substring(0, 2) === "95") {
      playSound("NG")
      setQrData1('waiting to scan...')
      setQrData2('waiting to scan...')
      SweetAlert.showAlertWithOptions({
        title: "Error",
        subTitle: 'QR ผิด plant',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        style: 'error',
        cancellable: true
      },
        callback => console.log('QR ผิด plant'));
      delay();

    }

    //location QR
    else {
      //check for sure that QR is not null and not undefine
      if (temp) {
        let count = (temp.match(sharpRegex) || []).length;
        console.log(count);
        if (count == 2) {

          let strBtwSharp = temp.substring(
            temp.indexOf("#") + 1,
            temp.lastIndexOf("#")
          );
          console.log("temp next index of #: " + (temp.indexOf("#") + 1));
          console.log("temp last index of #: " + temp.lastIndexOf("#"));
          setQr2Nocut(strBtwSharp)
          setQrData2(strBtwSharp)
          console.log('do locationQR mix');
        }
        else if (count < 2) {
          setQr2Nocut(temp)
          let transQR = transform(temp, "location")
          setQrData2(transQR)
          console.log('do locationQR single');
        }
      }
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
          "actionType": choice.SS,
          "plant": userData.plant
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
        delay();

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
        delay();

      }


      getLastScanned()
      setQrData1('waiting to scan...')
      setQrData2('waiting to scan...')

    } catch (error) {
      console.log(JSON.stringify(error));
    }
    finally {
      setTemp("")
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
          "actionType": choice.SS,
          "plant": userData.plant
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
        delay();

      }
      getLastScanned()
      setQrData1('waiting to scan...')
      setQrData2('waiting to scan...')

    } catch (error) {
      console.log(JSON.stringify('mix error' + error.message));

    }
    finally {
      setTemp("")
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
      console.log(Object.values(data).length);
      if (Object.values(data).length == 0) {
        setTransac(null)
      } else {
        setTransac(data)
      }

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
          <BackButton />
        </View>
        <View style={{ flex: 4, justifyContent: 'center', padding: '2%' }}>
          <TextInput style={{ backgroundColor: 'white', ...customStyles.regularTextStyle, color: 'white' }} onEndEditing={() => Input.current.focus()}
            showSoftInputOnFocus={false} ref={Input} autoFocus={true} onChangeText={text => { setTemp(text) }} value={""} blurOnSubmit={false} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ ...customStyles.regularTextStyle, color: 'white' }}>{userData.plant}</Text>
          <Text style={{ ...customStyles.regularTextStyle, color: 'white' }}>{choice.SS}</Text></View>
      </View>
      <View style={{
        flex: 8,
        backgroundColor: "#D1E2C4",
      }}>



        <QRIcon qrData={qrData1} qrName={"Tag"} />
        <QRIcon qrData={qrData2} qrName={"Lo"} />
        <View style={{ flex: 6 }}>
          <MyTable data={transac} DATA={DATA} />
        </View>

      </View>
      <Footer />
    </KeyboardAvoidingView>

  )
}

export default Scanning
