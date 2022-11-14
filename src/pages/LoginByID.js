import { View, Image, } from 'react-native'
import React, { useRef } from 'react'
import { customStyles } from '../styles'
import Footer from '../components/Footer'
import { TextInput, Button } from 'react-native-paper';

import { height_divide4, width_divide4 } from '../helpers/getSize'

import { useState, useEffect } from 'react';
import { useLoadingContext } from '../store/LoadingContext';
import { UserCenterAxios } from '../service/UserCenterAxios'
import { useAuthContext } from '../store/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SweetAlert from 'react-native-sweet-alert-best';


export default function LoginByID({ navigation }) {
    const [idEmp, setIdEmp] = useState("");
    const [idPerson, setIdPerson] = useState("");
    const { isLoading, setIsLoading } = useLoadingContext();
    const { userData, setUserData } = useAuthContext();
    const firstInput = useRef();
    const secondInput = useRef();

    async function loginID(idEmp, idPerson) {
        let trimIdE = idEmp.trim()
        let trimIdP = idPerson.trim()
        try {
            setIsLoading(true)
            const { data } = await UserCenterAxios
                .get(`/empid/${trimIdE}`)
            console.log(JSON.stringify(data));
            let temp = data[0]
            if (data.message === "Not found employee") {
                SweetAlert.showAlertWithOptions({
                    title: "Error",
                    subTitle: 'Not found employee!',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    style: 'error',
                    cancellable: true
                  },
                    callback => console.log('Not found employee'));
            }

            if (temp.personal_Id.substring(7, 13) == trimIdP) {
                console.log('correct');
                SweetAlert.showAlertWithOptions({
                    title: 'OK',
                    subTitle: 'Login success!',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    style: 'success',
                    cancellable: true
                },
                    callback => console.log('Login ID suc'));
                let plant_temp = ''
                if (temp.workAreaID === "SKCA") {
                    plant_temp = "81"
                }
                if (temp.workAreaID === "HEA01") {
                    plant_temp = "95"
                }
                setUserData({
                    empNo: temp.eid, name: `${temp.nameTH} ${temp.lastnameTH}`, img: temp.picture_url, plant: plant_temp
                }, navigation.navigate('Home', { img: temp.picture_url }))
            }
            else {
                //last 6 digit ID is wrong
                SweetAlert.showAlertWithOptions({
                    title: "Error",
                    subTitle: 'Last 6 digit ID is wrong!',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    style: 'error',
                    cancellable: true
                  },
                    callback => console.log('Last 6 digit ID is wrong'));

            }


        } catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView style={customStyles.loginContainer}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Image
                    style={{
                        width: width_divide4,
                        height: height_divide4,
                        resizeMode: 'center'

                    }}
                    source={require('../assets/icons/icon.png')}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput left={<TextInput.Icon name="account" >

                </TextInput.Icon>} right={<TextInput.Icon name="close" onPress={() => { setIdEmp('') }}>

                </TextInput.Icon>}
                    mode='outlined' ref={firstInput} returnKeyType={'next'} onSubmitEditing={() => secondInput.current.focus()} label="รหัสพนักงาน" value={idEmp} maxLength={8} onChangeText={text => setIdEmp(text)} style={{ width: '90%' }} />


                <TextInput left={<TextInput.Icon name="lock" >

                </TextInput.Icon>} right={<TextInput.Icon name="close" onPress={() => { setIdPerson('') }}>

                </TextInput.Icon>}
                    mode='outlined' ref={secondInput} onSubmitEditing={() => loginID(idEmp, idPerson)} label="บัตรประชาชน 6 ตัวท้าย" value={idPerson} maxLength={6} onChangeText={text => setIdPerson(text)} keyboardType={'number-pad'} style={{ width: '90%' }} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Button style={{ margin: '5%' }} onPress={() => loginID(idEmp, idPerson)} mode="contained" >เข้าสู่ระบบ</Button>
                <Button style={{ margin: '5%' }} onPress={() => navigation.navigate('LoginByNFC')} mode="outlined" color='black'  >
                    สแกนบัตรพนักงาน
                </Button>
            </View>


        </KeyboardAwareScrollView>
    )
}

