import React, { FC } from 'react'
import { Image, Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// types
import { StackNavigation } from '../../navigation/mainNavigation'

// styles
import styles from './styles'

const UserItem: FC<{ user: User }> = ({ user }) => {
  const navigation = useNavigation<StackNavigation>()
  const onEventPress = () => {
    navigation.navigate('Details', { user })
  }
  return (
    <Pressable style={styles.container} onPress={onEventPress}>
      <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />
      <Text style={styles.login}>{user.name.first}</Text>
    </Pressable>
  )
}

export default UserItem
