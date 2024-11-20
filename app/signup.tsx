import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'

const Signup = () => {
  const router = useRouter()
  const [conuntryCode, setContryCode] = useState('+58')
  const [phoneNumber, setPhoneNumber] = useState('')

  const { signUp } = useSignUp()

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0

  const onSignup = async () => {
    const fullPhoneNumber = `${conuntryCode}${phoneNumber}`

    // router.push({
    //   pathname: '/verify/[phone]',
    //   params: { phone: fullPhoneNumber },
    // })
    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      })
      await signUp!.preparePhoneNumberVerification()
      router.push({
        pathname: '/verify/[phone]',
        params: { phone: fullPhoneNumber },
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Lets get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We wil send you a confirmation code there
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Country'
            placeholderTextColor={Colors.gray}
            value={conuntryCode}
            onChangeText={setContryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder='Mobile number'
            keyboardType='numeric'
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Link href='/login' asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have a account? Login In
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignup}>
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
})
export default Signup
