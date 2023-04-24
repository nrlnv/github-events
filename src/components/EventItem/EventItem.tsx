import React from 'react'
import { Image, Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// types
import { StackNavigation } from '../../navigation/mainNavigation'

// styles
import styles from './styles'

const EventItem = ({ event }: any) => {
  const navigation = useNavigation<StackNavigation>()
  const onEventPress = () => {
    navigation.navigate('Details', { login: event.actor.login })
  }
  return (
    <Pressable style={styles.container} onPress={onEventPress}>
      <Image source={{ uri: event.actor.avatar_url }} style={styles.avatar} />
      <Text style={styles.login}>{event.actor.login}</Text>
    </Pressable>
  )
}

export default EventItem
