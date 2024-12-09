import { Dropdown } from '@/components/BottomSheet/Dropdown'
import RoundButton from '@/components/Buttons/RoundButton'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { useBalanceStore } from '@/store/balanceStore'
import { Ionicons } from '@expo/vector-icons'

import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  const { balance, setTransaction, transactions, clearTransactions } =
    useBalanceStore()

  const handleAddMoney = () => {
    setTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: 'Added money',
    })
  }

  const handleRequest = () => {
    console.log('Request')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
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

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 ? (
          <Text style={defaultStyles.descriptionText}>No transactions yet</Text>
        ) : (
          transactions
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((transaction) => {
              return (
                <View style={styles.transaction} key={transaction.id}>
                  <View style={styles.circle}>
                    <Ionicons
                      name={transaction.amount > 0 ? 'add' : 'remove'}
                      size={24}
                      color={transaction.amount > 0 ? Colors.green : Colors.red}
                    />
                  </View>
                  <View>
                    <Text>{transaction?.title}</Text>
                    <Text style={styles.date}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text>{transaction?.amount}$</Text>
                </View>
              )
            })
        )}
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

  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 10,
  },

  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    gap: 10,
  },

  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 12,
    color: Colors.gray,
  },
})
