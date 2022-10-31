import { View, TextInput, Text, FlatList } from 'react-native'
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


function Scanning({ navigation }) {
  const { choice } = useChoiceContext()
  const [temp, setTemp] = useState('')
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
    console.log('' + temp.charAt(0) + "wtf :" + fullLengthQR);
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
      if (data?.NG) {
        alert(data.NG)
      }




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

  function renderItem({ item }) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', height: '10%', flexDirection: 'row' }}>
        <View style={{ borderWidth: 1 }}>
          <Text>{item.createdDate}</Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>{item.resultStatus}</Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>{item.qrTag}</Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>{item.qrLocation}</Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>{item.tagItemNo}</Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>{item.locationItemNo}</Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>{item.createdBy}</Text>
        </View>

      </View>
    )
  }


  return (

    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps='always'>
      <View style={customStyles.HeaderContainer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{}}>
            <Icon name='keyboard-backspace' size={25}>
            </Icon>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4, justifyContent: 'center', padding: '2%' }}>
          <TextInput style={{ backgroundColor: 'white' }} ref={Input} returnKeyType={"next"} autoFocus={true} onChangeText={text => { setTemp(text), Input.current.focus() }} value={""} blurOnSubmit={false} onSubmitEditing={() => { qrProcess(), Input.current.focus() }} />
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={{
        flex: 8,
        backgroundColor: "#D1E2C4",


      }}>



        <QRIcon qrData={qrData1} />
        <QRIcon qrData={qrData2} />
        <View style={{
          flex: 3,
          backgroundColor: 'white'
        }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{}}>
              <Text>Date Time</Text>
            </View>
            <View style={{}}>
              <Text>Status</Text>
            </View>

            <View style={{}}>
              <Text>Tag Item</Text>
            </View>
            <View style={{}}>
              <Text>Location Item</Text>
            </View>
            <View style={{}}>
              <Text>Scan by</Text>
            </View>
          </View>
          <FlatList

            data={transac}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />


        </View>

      </View>

      <Footer />
    </KeyboardAwareScrollView>

  )
}

export default Scanning

{/* < View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Current Type : {choice.BR}, {choice.SS}</Text>
</View > */}