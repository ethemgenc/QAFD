import { Text, View, Button, Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { Component, useState } from 'react';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore'
import Cell from '../../utils/Cell';
import { Avatar, Subheading, Title } from 'react-native-paper';
import { colors } from '../../utils/Constants';

export class ProfilComponents extends Component {

    state = {
        currentUser: {},
        usersColl: firestore().collection('users'),
    };

    static contextType = AuthContext

    getUser() {
        console.log("1")
        const { user } = this.context;
        this.state.usersColl
            .doc(user.uid)
            .get()
            .then((data) => {
                this.setState({ currentUser: (data.data()) })
            })
    }

    componentDidMount() {
        this.getUser()
    }

    componentDidUpdate() {
        this.getUser()
    }

    updateDenemeSayisi = async () => {
        const { user } = this.context;
        var newSayi = this.state.currentUser.Credit + 1
        await this.state.usersColl.doc(user.uid).update({
            Credit: newSayi,
        })
        Alert.alert(" ", 'Krediniz Güncellendi.');
    }

    render() {
        //const { navigation } = this.props;
        const { signout } = this.context;
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                <ScrollView style={{ flex: 1, backgroundColor: colors.background, width: '100%', }} >
                    <View style={styles.userAvatar}>
                        <Avatar.Image source={{ uri: this.state.currentUser.ImageURL }} size={100} />
                        <Title>{this.state.currentUser.UserName}</Title>
                        <Subheading>{this.state.currentUser.Name} {this.state.currentUser.LastName}</Subheading>
                        <Subheading>{this.state.currentUser.Email}</Subheading>
                    </View>
                    <Cell style={{ marginBottom: 20, }} title='Logout' icon='sign-out-alt' tintColor='red' onPress={() => {
                        signout()
                    }} />
                    <Cell style={{ borderBottomWidth: 2, }} title={'Points : ' + this.state.currentUser.Points} icon='star' tintColor='black' />
                    <Cell style={{ borderBottomWidth: 2, }} title={'Deneme Hakkiniz : ' + this.state.currentUser.DenemeSayisi} icon='coins' tintColor='black' onPress={() => {
                        this.props.navigation.navigate('BuyPoints')
                    }} />
                    <Cell style={{ borderBottomWidth: 2, }} title={'Krediniz : ' + this.state.currentUser.Credit} icon='coins' tintColor='black' onPress={() => {
                        this.props.navigation.navigate('BuyCredit')
                    }} />
                    <Cell style={{ borderBottomWidth: 2, }} title='Arkadaşlarını Davet Et' icon='share' tintColor='black' onPress={() => {
                        alert('Belki daha sonra...');
                    }} />
                    <Cell style={{ borderBottomWidth: 2, }} title='Profili Düzenle' icon='user-edit' tintColor='black' onPress={() => {
                        this.props.navigation.navigate('ProfileSettingsScreen');
                    }} />
                </ScrollView>
            </SafeAreaView>
        );
    }
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

export default ProfilComponents;
