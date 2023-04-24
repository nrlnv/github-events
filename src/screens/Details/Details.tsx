import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'

// navigation
import { MainStackParamsList } from '../../navigation/mainNavigation'

// redux
import { useAppDispatch, useAppSelector } from '../../store'
import {
  clearCurrentUser,
  getUser,
  selectCurrentUser,
} from '../../store/userSlice'

//styles
import styles from './styles'

const Details = () => {
  const route = useRoute<RouteProp<MainStackParamsList, 'Details'>>()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)
  const { avatar_url, name, type, location } = currentUser

  useEffect(() => {
    dispatch(getUser({ login: route.params.login }))

    return () => {
      dispatch(clearCurrentUser())
    }
  }, [dispatch, route.params.login])

  return (
    <View style={styles.container}>
      {avatar_url && (
        <Image source={{ uri: currentUser.avatar_url }} style={styles.avatar} />
      )}
      {name && <Text>Name: {currentUser.name}</Text>}
      {type && <Text>Account type: {currentUser.type}</Text>}
      {location && <Text>User location: {currentUser.location}</Text>}
    </View>
  )
}

export default Details
