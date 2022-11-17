import React,{useEffect} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { customStyles } from '../styles'
import { useAuthContext } from '../store/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useChoiceContext } from '../store/ChoiceContext';
import SweetAlert from 'react-native-sweet-alert-best';


function Header({ navigation }) {
    const { userData, setUserData } = useAuthContext();
    const { choice, setChoice } = useChoiceContext()
    //console.log('img : '+img);
    console.log('userData.img : ' + userData.img);
    useEffect(() => {
      
    
      
    }, [userData])
    
    function logout() {
        setChoice({ SS: '' })

        SweetAlert.showAlertWithOptions({
            title: 'Logout',
            subTitle: 'คุณต้องการออกจากระบบ?',
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            otherButtonTitle: 'Close',
            otherButtonColor: '#dedede',
            style: 'warning',
            cancellable: true
        },
            callback => { console.log('logout from sweet'), setUserData({ empNo: '', name: '', img: '', plant: '' }), navigation.reset({ index: 0, routes: [{ name: 'LoginByNFC' }] }) });

    }
    return (
        <View style={customStyles.HeaderContainer}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{

                        height: '90%',
                        width: '85%',
                        borderRadius: 35,


                    }}

                    source={{ uri: userData.img!=""?userData.img:null }}
                />

            </View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ ...customStyles.regularTextStyle, color: 'white' }}>{userData.name}</Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => { logout() }}><Icon name={'logout'} size={25} color={'white'} /></TouchableOpacity>
            </View>
        </View>
    )
}

export default Header


{/* <Image
style={{
    flex: 1,
    resizeMode: 'contain'

}}
source={{uri:"https://th.bing.com/th/id/OIP.FlNBQsbIiXszqHKJDWyyOQHaEy?pid=ImgDet&rs=1" }}
/> */}