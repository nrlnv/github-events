import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

// redux
import { useAppDispatch, useAppSelector } from '../../store'
import { getUsers, selectIsLoading, selectUsers } from '../../store/usersSlice'

// components
import UserItem from '../../components/EventItem/UserItem'

// styles
import styles from './styles'

const Home = () => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()
  const users = useAppSelector(selectUsers)
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    if (isFocused) {
      dispatch(getUsers())
    }
  }, [dispatch, isFocused])

  useEffect(() => {
    let timer = setInterval(() => {
      dispatch(getUsers())
    }, 30000)

    return () => {
      clearInterval(timer)
    }
  }, [isFocused])

  const renderItem = ({ item }: any) => {
    return <UserItem user={item} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        refreshing={isLoading}
        onRefresh={() => dispatch(getUsers())}
        extraData={isLoading}
      />
    </View>
  )
}

export default Home
