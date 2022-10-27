import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { customStyles } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useChoiceContext } from '../store/ChoiceContext';

function Content({ menus, navigation }) {
    const { choice,setChoice } = useChoiceContext()
    function beforeSetChoice(menuName) {

        // if next page is scanning, so this should set supply or store.
        if (menus[0].route_name === "Scanning") {
            setChoice({BR:choice.BR,SS:menuName})
            //if next page is supply/store choice,so this should set box or store choice.
        } else if (menus[0].route_name === "SSChoice") {
            setChoice({BR:menuName,SS:choice.SS})
        }
    }
    return (
        <View style={customStyles.contentContainer}>
            {
                menus.map((menu) => {
                    return (<TouchableOpacity onPress={() => { navigation.navigate(menu.route_name), beforeSetChoice(menu.menu_name) }} key={menu.id} style={customStyles.menuContainer}>
                        <Text style={customStyles.regularTextStyle}>{menu.menu_name}</Text><Icon size={50} name={menu.icon_name} /></TouchableOpacity>)

                })
            }
        </View>
    )
}

export default Content