import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


function BackButton() {
    const navigation = useNavigation();

    return (
        <>
            <TouchableOpacity onPress={() => { navigation.goBack(), console.log('press back') }} style={{}}>
                <Icon name='keyboard-backspace' size={25} color={'white'} />

            </TouchableOpacity>
        </>

    );
}

export default BackButton