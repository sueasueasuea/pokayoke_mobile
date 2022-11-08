
import React from 'react'
import Footer from '../components/Footer'
import Content from '../components/Content'
import { choices } from '../constants/Menu'

function SSChocie({navigation}) {
    return (
        <>
            <Content menus={choices} navigation={navigation} />
            <Footer />
        </>
    )
}

export default SSChocie