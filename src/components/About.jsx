import { View, Text, Button } from 'react-native'
import React from 'react'

const About = ({navigation, route}) => {
  const {fullName, course} = route.params
  return (
    <View>
      <Text>Congratulations! {fullName}</Text>
      <Text>You registered for {course} Course.</Text>
      <Button title='Go to Next Page' onPress={() => navigation.navigate('Modal')} />
    </View>
  )
}

export default About