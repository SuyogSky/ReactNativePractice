import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'

const Home = ({navigation}) => {
  const {user} = useContext(AuthContext)
  return (
    <View>
      <Text>Welcome {user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  )
}

export default Home