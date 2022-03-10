import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icons from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import { colors } from '../utils/Constants'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
    return (
        <Tab.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false, tabBarStyle: {
            backgroundColor: colors.background,
        }, }}>
            <Tab.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{
                    tabBarLabel: 'Giriş',
                    tabBarLabelStyle: {
                        color: colors.white,
                    },
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icons name='user-shield' color={focused ? colors.primary : colors.grey} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name='SignUpScreen'
                component={SignUpScreen}
                options={{
                    tabBarLabel: 'Kayıt',
                    tabBarLabelStyle: {
                        color: colors.white,
                    },
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icons name='user-plus' color={focused ? colors.primary : colors.grey} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name='ResetPasswordScreen'
                component={ResetPasswordScreen}
                options={{
                    tabBarLabel: 'Şifremi Unuttum',
                    tabBarLabelStyle: {
                        color: colors.white,
                    },
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icons name='key' color={focused ? colors.primary : colors.grey} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='BottomTabStack' >
            <Stack.Screen
                name='BottomTabStack'
                component={BottomTabStack}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack;
