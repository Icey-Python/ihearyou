import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'

const Property = () => {
    const { id } = useLocalSearchParams();
    return (
        <View className='flex-1 bg-red-500'>
            <Text>Property { id }</Text>
        </View>
    )
}

export default Property
