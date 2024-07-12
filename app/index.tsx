import { View, Text, StyleSheet } from 'react-native'
import { useAssets } from 'expo-asset'
import { Video } from 'expo-av'

export default function Main() {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')])

  return (
    <View style={styles.container}>
      {assets && <Video source={{ uri: assets[0].uri }} style={styles.video} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
})
