import { View, Text, Image } from 'react-native'
import React from 'react'
import { customStyles } from '../styles'
import Footer from '../components/Footer'
import { Button, TextInput, IconButton } from '@react-native-material/core'
import { size } from '../helpers/getSize'


export default function LoginByID({ navigation }) {
    return (
        <View style={customStyles.loginContainer}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                    style={{
                        flex: 1,
                        resizeMode: 'contain'

                    }}
                    source={require('../assets/icons/icon.png')}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>

            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Button onPress={() => navigation.navigate('LoginByNFC')} style={{}} variant='outlined' title={'สแกนบัตรพนักงาน'} color='black' titleStyle={customStyles.regularTextStyle} />
            </View>


        </View>
    )
}

/*<TextInput
                    label="Label"
                    variant="outlined"
                    trailing={props => (
                        <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
                    )}
                />
 */