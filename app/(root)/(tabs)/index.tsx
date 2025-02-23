import { Link } from 'expo-router'
import { View, Text } from 'react-native'

export default function HomeScreen() {
  return (
    <View className='bg-red-500 flex-1 flex justify-center items-center'>
    <Text>Home</Text>
      <Link href='/explore'>Explore</Link>
      <Link href='/properties/1'>Property</Link>
    </View>
  )
}
