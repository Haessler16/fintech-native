import { Dropdown } from '@/components/BottomSheet/Dropdown'
import RoundButton from '@/components/Buttons/RoundButton'
import Colors from '@/constants/Colors'

import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  const balance = 1420

  const handleAddMoney = () => {
    console.log('Add money')
  }

  const handleRequest = () => {
    console.log('Request')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>USD</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundButton text='Add money' icon='add' onPress={handleAddMoney} />
        <RoundButton
          text='Exchange'
          icon='swap-horizontal'
          onPress={handleAddMoney}
        />
        <RoundButton text='Details' icon='list' onPress={handleAddMoney} />
        <Dropdown />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  account: {
    margin: 80,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 5,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 20,
    color: Colors.gray,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
})
