import { View, Image, } from 'react-native'
import React from 'react'
import { customStyles } from '../styles'
import Footer from '../components/Footer'
import { TextInput, Button } from 'react-native-paper';

import { height_divide4,width_divide4 } from '../helpers/getSize'

import { useState,useEffect  } from 'react';
import { useLoadingContext } from '../store/LoadingContext';
import { UserCenterAxios } from '../service/UserCenterAxios'
import { useAuthContext } from '../store/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function LoginByID({ navigation }) {
    const [idEmp, setIdEmp] = useState("");
    const [idPerson, setIdPerson] = useState("");
    const { isLoading, setIsLoading } = useLoadingContext();
    const { userData, setUserData } = useAuthContext();
    

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

            }

            if (temp.personal_Id.substring(7, 13) == trimIdP) {
                console.log('correct');
                setUserData({
                    empNo: temp.eid, name: `${temp.nameTH} ${temp.lastnameTH}`, img: temp.picture_url
                }, navigation.navigate('Home', { img: temp.picture_url }))
            }


        } catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView style={customStyles.loginContainer}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  }}>
                <Image
                    style={{
                       width:width_divide4,
                       height:height_divide4,
                       resizeMode : 'center'

                    }}
                    source={require('../assets/icons/icon.png')}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput left={<TextInput.Icon name="account" >

                </TextInput.Icon>} right={<TextInput.Icon name="close" onPress={() => { setIdEmp('') }}>

                </TextInput.Icon>}
                mode='outlined' label="รหัสพนักงาน" value={idEmp} maxLength={8} onChangeText={text => setIdEmp(text)} style={{ width: '90%', }}  />


                <TextInput left={<TextInput.Icon name="lock" >

                </TextInput.Icon>} right={<TextInput.Icon name="close" onPress={() => { setIdPerson('') }}>

                </TextInput.Icon>}
                   onSubmitEditing={()=>loginID(idEmp, idPerson)} mode='outlined' label="บัตรประชาชน 6 ตัวท้าย" value={idPerson} maxLength={6} onChangeText={text => setIdPerson(text)} keyboardType={'number-pad'} style={{ width: '90%' }} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Button style={{margin:'5%' }} onPress={() => loginID(idEmp, idPerson)} mode="contained" >เข้าสู่ระบบ</Button>
                <Button style={{margin:'5%' }} onPress={() => navigation.navigate('LoginByNFC')}  mode="outlined" color='black'  >
                    สแกนบัตรพนักงาน
                </Button>
            </View>


        </KeyboardAwareScrollView>
    )
}

