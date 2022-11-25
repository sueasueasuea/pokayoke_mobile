import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderMenu from '../components/HeaderMenu'
import Footer from '../components/Footer'
import { RestAxios } from '../service/RestAxios'
import { useLoadingContext } from '../store/LoadingContext';
import { useAuthContext } from '../store/AuthContext'
import MyTable from '../components/MyTable'
import { DATA } from '../constants/DataHeader'

export default function History() {
  const [transac, setTransac] = useState(null)
  const { setIsLoading } = useLoadingContext();
  const { userData } = useAuthContext()

  async function getLastScanned() {
    try {
      setIsLoading(true)
      const { data } = await RestAxios(
        {
          url: `/lasttop10byscanner`,
          method: "POST",
          data: {
            "createdBy": userData.empNo
          }
        })
      console.log(JSON.stringify(data));
      console.log(Object.values(data).length);
      if (Object.values(data).length == 0) {
        setTransac(null)
      } else {
        setTransac(data)
      }

    } catch (error) {
      console.log(JSON.stringify(error));
    }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getLastScanned()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <HeaderMenu name={"History"} />
      <View style={{flex:6, backgroundColor: "#D1E2C4" }}>
        <MyTable data={transac} DATA={DATA} height={500} />
      </View>

      <Footer />

    </View>
  )
}

