import React from 'react'
import { View, Text, Image,TouchableOpacity } from 'react-native'
import { customStyles } from '../styles'
import { useAuthContext } from '../store/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




function Header({ img ,navigation}) {
    const { userData,setUserData } = useAuthContext();
    function logout () {
        setUserData({empNo:'',name:'',img:''})
        navigation.navigate('LoginByNFC')
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

                    source={{ uri: img ?? userData.img }}
                />

            </View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ ...customStyles.regularTextStyle, color: 'white' }}>{userData.name}</Text>
            </View>
            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                <TouchableOpacity onPress={()=>{logout()}}><Icon name={'logout'} size={25} color={'white'} /></TouchableOpacity>
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