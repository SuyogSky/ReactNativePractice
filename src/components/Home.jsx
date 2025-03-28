import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Home = ({ navigation }) => {
  const {logoutUser} = useContext(AuthContext)
  return (
    <View>
      <Text>Welcome Suyog</Text>
      <Button title='Log out' onPress={logoutUser} />
      <Text onPress={() => navigation.navigate('Details')}>Go to details</Text>
    </View>
  )
}

export default Home