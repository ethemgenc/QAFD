import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Subheading, Title } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'
import { colors } from '../../utils/Constants'
import Cell from '../../utils/Cell'
import firestore from '@react-native-firebase/firestore'
import Loading from '../../utils/Loading'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ProfileScreen = ({ navigation }) => {

    const { signout, user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const usersColl = firestore().collection('users');
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false); // refresh

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUserColl();
        wait(2000).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        getUserColl()
    }, [])

    const getUserColl = () => {
        usersColl
            .doc(user.uid)
            .get()
            .then((data) => {
                setCurrentUser(data.data())
            })
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <ScrollView style={{ flex: 1, backgroundColor: colors.background, width: '100%', }} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <View style={styles.userAvatar}>
                    <Avatar.Image source={{ uri: currentUser.ImageURL }} size={100} />
                    <Title>{currentUser.UserName}</Title>
                    <Subheading>{currentUser.Name} {currentUser.LastName}</Subheading>
                    <Subheading>{currentUser.Email}</Subheading>
                </View>
                <Cell style={{ marginBottom: 20, }} title='Logout' icon='sign-out-alt' tintColor='red' onPress={() => {
                    signout()
                }} />
                <Cell style={{ borderBottomWidth: 2, }} title={'Points : ' + currentUser.Points} icon='star' tintColor='black' />
                <Cell style={{ borderBottomWidth: 2, }} title={'Deneme Hakkiniz : ' + currentUser.DenemeSayisi} icon='coins' tintColor='black' onPress={() => {
                    navigation.navigate('BuyPoints')
                }} />
                <Cell style={{ borderBottomWidth: 2, }} title={'Krediniz : ' + currentUser.Credit} icon='coins' tintColor='black' onPress={() => {
                    navigation.navigate('BuyCredit')
                }} />
                <Cell style={{ borderBottomWidth: 2, }} title='Arkadaşlarını Davet Et' icon='share' tintColor='black' onPress={() => {
                    alert('Belki daha sonra...');
                }} />
                <Cell style={{ borderBottomWidth: 2, }} title='Profili Düzenle' icon='user-edit' tintColor='black' onPress={() => {
                    navigation.navigate('ProfileSettingsScreen');
                }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    userAvatar: {
        width: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
        borderBottomWidth: 5,
    },
})

export default ProfileScreen;
