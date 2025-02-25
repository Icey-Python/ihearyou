import * as Speech from 'expo-speech'
import { View, Text, Button, ScrollView } from 'react-native'
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition'
import { useState } from 'react'

export default function HomeScreen() {
  const [color, setColor] = useState('white')
  const [recognizing, setRecognizing] = useState(false)
  const [transcript, setTranscript] = useState('')

  useSpeechRecognitionEvent('start', () => setRecognizing(true))
  useSpeechRecognitionEvent('end', () => setRecognizing(false))
  useSpeechRecognitionEvent('result', (event) => {
    setTranscript(event.results[0]?.transcript)
  })
  useSpeechRecognitionEvent('error', (event) => {
    console.log('error code:', event.error, 'error message:', event.message)
  })
  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync()
    if (!result.granted) {
      console.warn('Permissions not granted', result)
      return
    }
    ExpoSpeechRecognitionModule.start({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
    })
  }
  const speak = () => {
    if (transcript.includes('red')) {
      Speech.speak('Here is the red screen')
      setColor('red')
    }
    if (transcript.includes('blue')) {
      Speech.speak('Here is the blue screen')
      setColor('blue')
    }
  }
  return (
    <View
      className=' flex-1 flex justify-center items-center'
      style={{ backgroundColor: color }}
    >
      <View>
        {!recognizing ? (
          <Button title='Start' onPress={handleStart} />
        ) : (
          <Button
            title='Stop'
            onPress={() => ExpoSpeechRecognitionModule.stop()}
          />
        )}

        <Text className='text-2xl'>{transcript}</Text>
        <Button title='Press to hear some words' onPress={speak} />
      </View>
    </View>
  )
}
