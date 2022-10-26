import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { customStyles } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Content({ menus }) {
    console.log(JSON.stringify(menus));
    return (
        <View style={customStyles.contentContainer}>
            {
                menus.map((menu) => {
                    return (<TouchableOpacity key={menu.id} style={customStyles.menuContainer}> 
                    <Text style={customStyles.regularTextStyle}>{menu.menu_name}</Text><Icon size={50} name={menu.icon_name}/></TouchableOpacity>)

                })
            }
        </View>
    )
}

export default Content