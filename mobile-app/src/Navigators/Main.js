import {
  IndexAuthenticationContainer,
  IndexCarDetailsContainer,
  IndexCarOverviewContainer,
  IndexExpensesContainer,
  IndexInsuranceDetailsContainer,
} from '@/Containers'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import { StackActions } from '@react-navigation/routers'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

const OverviewStack = createStackNavigator()

const OverviewStackScreen = () => {
  return (
    <OverviewStack.Navigator>
      <OverviewStack.Screen
        name={'CarOverview'}
        component={IndexCarOverviewContainer}
      />
      <OverviewStack.Screen
        name={'CarDetails'}
        component={IndexCarDetailsContainer}
      />
      <OverviewStack.Screen
        name={'InsuranceDetails'}
        component={IndexInsuranceDetailsContainer}
      />
    </OverviewStack.Navigator>
  )
}

const ExpensesStack = createStackNavigator()

const ExpensesStackScreen = () => {
  return (
    <ExpensesStack.Navigator>
      <ExpensesStack.Screen
        name={'Expenses'}
        component={IndexExpensesContainer}
      />
    </ExpensesStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()
const Authentication = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
  const sessionToken = useSelector((state) => state.user.sessionToken)

  return sessionToken == null ? (
    <Authentication.Navigator>
      <Authentication.Screen
        name="Authentication"
        component={IndexAuthenticationContainer}
      />
    </Authentication.Navigator>
  ) : (
    <Tab.Navigator>
      <Tab.Screen
        name="My car"
        component={OverviewStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
