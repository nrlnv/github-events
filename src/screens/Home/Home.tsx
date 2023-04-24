import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

// redux
import { useAppDispatch, useAppSelector } from '../../store'
import { getEvents, selectEvents, selectIsLoading } from '../../store/homeSlice'

// components
import EventItem from '../../components/EventItem/EventItem'

// styles
import styles from './styles'

const Home = () => {
  const dispatch = useAppDispatch()
  const isFocused = useIsFocused()
  const events = useAppSelector(selectEvents)
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    if (isFocused) {
      dispatch(getEvents())
    }
  }, [dispatch, isFocused])

  useEffect(() => {
    let timer = setInterval(() => {
      dispatch(getEvents())
    }, 30000)

    return () => {
      clearInterval(timer)
    }
  }, [isFocused])

  const renderItem = ({ item }: any) => {
    return <EventItem event={item} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={() => dispatch(getEvents())}
      />
    </View>
  )
}

export default Home
