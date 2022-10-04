import { View, Image } from 'react-native'
import React from 'react'
import { customStyles } from '../styles'
import Footer from '../components/Footer'
import { TextInput, Button } from 'react-native-paper';

import { size } from '../helpers/getSize'

import { useState, useEffect } from 'react';



export default function LoginByID({ navigation }) {
    const [idEmp, setIdEmp] = useState("");
    const [idPerson, setIdPerson] = useState("");

    function loginID(params) {

    }

    return (
        <View style={customStyles.loginContainer}>
            <View style={{ flex: 1, alignItems: 'center',justifyContent:'center' }}>
                <Image
                    style={{
                        flex: 0.5,
                        resizeMode: 'contain'

                    }}
                    source={require('../assets/icons/icon.png')}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput left={<TextInput.Icon name="account" >

                </TextInput.Icon>} right={<TextInput.Icon name="close" onPress={() => { setIdEmp('') }}>

                </TextInput.Icon>}
                    mode='outlined' label="รหัสพนักงาน" value={idEmp} maxLength={7} onChangeText={text => setIdEmp(text)} style={{ width: '90%', }} />


                <TextInput left={<TextInput.Icon name="lock" >

                </TextInput.Icon>} right={<TextInput.Icon name="close" onPress={() => { setIdPerson('') }}>

                </TextInput.Icon>}
                    mode='outlined' label="บัตรประชาชน 6 ตัวท้าย" value={idPerson} maxLength={6} onChangeText={text => setIdPerson(text)} keyboardType={'number-pad'} style={{ width: '90%' }} />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Button onPress={() => loginID(idEmp, idPerson)} mode="contained" >เข้าสู่ระบบ</Button>
                <Button onPress={() => navigation.navigate('LoginByNFC')} style={{}} mode="outlined" color='black'  >
                    สแกนบัตรพนักงาน
                </Button>
            </View>


        </View>
    )
}

