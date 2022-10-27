
import React from 'react'
import Footer from '../components/Footer'
import Content from '../components/Content'
import { subchoices } from '../constants/Menu'

function SSChocie({navigation}) {
    return (
        <>
            <Content menus={subchoices} navigation={navigation} />
            <Footer />
        </>
    )
}

export default SSChocie