import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'

// navigation
import { MainStackParamsList } from '../../navigation/mainNavigation'

//styles
import styles from './styles'

const Details: FC = () => {
  const route = useRoute<RouteProp<MainStackParamsList, 'Details'>>()
  const { user } = route.params
  const {
    picture: { large },
    name: { first },
    gender,
    email,
  } = user

  return (
    <View style={styles.container}>
      {large && <Image source={{ uri: large }} style={styles.avatar} />}
      {first && <Text>Name: {first}</Text>}
      {email && <Text>Email: {email}</Text>}
      {gender && <Text>Gender: {gender}</Text>}
    </View>
  )
}

export default Details
