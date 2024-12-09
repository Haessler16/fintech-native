import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { useAssets } from 'expo-asset'
import { ResizeMode, Video } from 'expo-av'
import { Link } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'

export default function Main() {
  // const [assets] = useAssets([require('@/assets/videos/intro.mp4')])
  // const [assets] = useAssets([require('../assets/videos/intro.mp4')])

  // console.log({ assets })
  return (
    <View style={styles.container}>
      <Video
        isLooping
        isMuted
        shouldPlay
        resizeMode={ResizeMode.COVER}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        style={styles.video}
      />

      <View style={{ padding: 20, marginTop: 80 }}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href='/signin'
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </Link>

        <Link
          href='/signup'
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: '#fff' },
          ]}>
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: '500' }}> Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
})
