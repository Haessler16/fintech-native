import { View, Text, StyleSheet } from 'react-native'
import { useAssets } from 'expo-asset'
import { ResizeMode, Video } from 'expo-av'

export default function Main() {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')])

  console.log({ assets })
  return (
    <View style={styles.container}>
      {assets && (
        <Video
          isLooping
          isMuted
          shouldPlay
          resizeMode={ResizeMode.COVER}
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      {/* <Text>Main</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
})
