import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Colors from '@/constants/Colors'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}>
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name='home' color={color} size={size} />
          },
        }}
      />
      <Tabs.Screen
        name='invest'
        options={{
          title: 'Invest',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name='line-chart' color={color} size={size} />
          },
        }}
      />
      <Tabs.Screen
        name='transfers'
        options={{
          title: 'Transfers',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name='exchange' color={color} size={size} />
          },
        }}
      />
      <Tabs.Screen
        name='crypto'
        options={{
          title: 'Crypto',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name='bitcoin' color={color} size={size} />
          },
        }}
      />
      <Tabs.Screen
        name='lifestyle'
        options={{
          title: 'Lifestyle',
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name='th' color={color} size={size} />
          },
        }}
      />
    </Tabs>
  )
}
