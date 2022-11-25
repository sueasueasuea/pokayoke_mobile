import { View, Text } from 'react-native'
import React from 'react'
import { customStyles } from '../styles'
import Table from 'react-native-simple-table'


const MyTable = ({data,height=320,columnWidth=60,DATA}) => {
    return (
        <View style={{
            flex: 1,
            padding: '3%',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
            {data == null ? <Text style={customStyles.regularTextStyle}>There is no data</Text> : <Table height={height} columnWidth={columnWidth} columns={DATA} dataSource={data} />}



        </View>
    )
}

export default MyTable