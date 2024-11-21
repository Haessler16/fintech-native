import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type RoundButtonProps = {
  text: string
  icon: typeof Ionicons.defaultProps
  onPress: () => void
}
export default function RoundButton({ text, icon, onPress }: RoundButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={24} color={Colors.primary} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
    // padding: 20,
    // borderRadius: 10,
    // backgroundColor: Colors.primaryMuted,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
})
