import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo'
import { defaultStyles } from '@/constants/Styles'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import Colors from '@/constants/Colors'

const CELL_COUNT = 6

const Phone = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string
    signin?: string
  }>()

  const [code, setCode] = useState('')
  const { signIn } = useSignIn()
  const { signUp, setActive } = useSignUp()

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  })

  useEffect(() => {
    if (code.length === 6) {
      if (signin === 'true') {
        verifySignIn()
      } else {
        verifyCode()
      }
    }
  }, [code])

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      })
      await setActive!({ session: signUp!.createdSessionId })
      router.replace('/')
    } catch (error) {
      console.log(error)
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].longMessage)
      }
    }
  }
  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      })
      await setActive!({ session: signIn!.createdSessionId })
      router.replace('/')
    } catch (error) {
      console.log(error)
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].longMessage)
      }
    }
  }

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phone} unless you already signed in.
      </Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        // autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID='my-code-input'
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              style={[styles.cellRoot, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />

      <Link href='/signin' asChild replace>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink, { marginTop: 20 }]}>
            Already have an account? Log in.
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    textAlign: 'center',
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    width: 10,
    height: 2,
    backgroundColor: Colors.gray,
    alignSelf: 'center',
  },
})

export default Phone
