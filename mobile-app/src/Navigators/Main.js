import React from 'react'
import { useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  IndexCarOverviewContainer,
  IndexCarDetailsContainer,
  IndexInsuranceDetailsContainer,
  IndexExpensesContainer,
  IndexAuthenticationContainer,
  IndexDamagesContainer,
  IndexDamageDetailsContainer,
} from '@/Containers'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from '@react-navigation/stack'
import { StackActions } from '@react-navigation/routers'

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

const DamagesStack = createStackNavigator()

const DamagesStackScreen = () => {
  return (
    <DamagesStack.Navigator>
      <DamagesStack.Screen name={'Damages'} component={IndexDamagesContainer} />
      <DamagesStack.Screen
        name={'DamageDetails'}
        component={IndexDamageDetailsContainer}
      />
    </DamagesStack.Navigator>
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

const TabNavigator = () => {
  return (
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

const Authentication = createStackNavigator()

const AuthenticationNavigator = () => {
  return (
    <Authentication.Navigator>
      <Authentication.Screen
        name="Authentication"
        component={IndexAuthenticationContainer}
      />
    </Authentication.Navigator>
  )
}

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
        // component={IndexOnboardinContainer}
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
      <Tab.Screen
        name="Damages"
        component={DamagesStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wrench" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
