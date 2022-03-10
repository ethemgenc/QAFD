import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';
import ProfileSettingsScreen from '../screens/Home/ProfileSettingsScreen';
import QuizScreen from '../screens/Home/QuizScreen';
import BuyCredit from '../screens/Home/BuyCredit';
import BuyPoints from '../screens/Home/BuyPoints';
import { colors } from '../utils/Constants';
import ProfilComponent from '../screens/Home/ProfilComponents';
import QuizComponent from '../screens/Home/QuizComponent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackHome = createStackNavigator();

const HomeScreenStack = () => {
    return (
        <StackHome.Navigator >
            <StackHome.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
            <StackHome.Screen name='ProfileScreen' component={ProfileScreen} options={{
                headerTitle: "Profil",
                headerTitleStyle: {
                    color: colors.white,
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.white,
            }}/>
            <StackHome.Screen name='ProfilComponent' component={ProfilComponent} options={{
                headerTitle: "Profil",
                headerTitleStyle: {
                    color: colors.white,
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.white,
            }}/>
            <StackHome.Screen name='ProfileSettingsScreen' component={ProfileSettingsScreen} options={{
                headerTitle: "Profili Düzenle",
                headerTitleStyle: {
                    color: colors.white,
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.white,
            }}/>
            <StackHome.Screen name='BuyCredit' component={BuyCredit} options={{
                headerTitle: "Buy Credit",
                headerTitleStyle: {
                    color: colors.white,
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.white,
            }}/>
            <StackHome.Screen name='BuyPoints' component={BuyPoints} options={{
                headerTitle: "Buy Points",
                headerTitleStyle: {
                    color: colors.white,
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.white,
            }}/>
            <StackHome.Screen name='QuizComponent' component={QuizComponent} options={{
                headerTitle: "QAFD",
                headerTitleStyle: {
                    color: colors.white,
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.white,
            }}/>
        </StackHome.Navigator>
    )
};

const BottomTabStack = () => {
    return (
        <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{
            tabBarStyle: {
                backgroundColor: colors.background,
            },
        }}>
            <Tab.Screen
                name='HomeScreenStack'
                component={HomeScreenStack}
                options={{
                    tabBarLabel: 'Ana Sayfa',
                    tabBarLabelStyle: {
                        color: colors.white,
                    },
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icons name='home' color={focused ? colors.secondary : colors.grey} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name='QuizScreen'
                component={QuizScreen}
                options={{
                    tabBarLabel: 'Quiz',
                    tabBarLabelStyle: {
                        color: colors.white,
                    },
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icons name='question' color={focused ? colors.secondary : colors.grey} size={size} />
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

const HomeStack = () => {
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
    );
};

export default HomeStack;
