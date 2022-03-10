import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Button, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Subheading, Title } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'
import { colors } from '../../utils/Constants'
import firestore from '@react-native-firebase/firestore'
import Loading from '../../utils/Loading'
import { TestIds, RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';

const BuyCredit = () => {
    const { signout, user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const usersColl = firestore().collection('users');
    const [isLoading, setIsLoading] = useState(false);
    const [newName, onChangeNewName] = useState("");
    const [points, setPoints] = useState(1);

    const updateDenemeSayisi = async () => {
        setIsLoading(true)
        var newSayi = currentUser.Credit + 1
        await usersColl.doc(user.uid).update({
            Credit: newSayi,
        })
        setIsLoading(false)
        getUserColl()
        Alert.alert(" ", 'Krediniz Güncellendi.');
    }

    useEffect(() => {
        getUserColl();
    }, [])

    const getUserColl = () => {
        usersColl
            .doc(user.uid)
            .get()
            .then((data) => {
                setCurrentUser(data.data())
            })
    }

    const isValid = () => {
        if (points <= 0) {
            return true
        }
        return false
    }

    const showRewarded = async () => {
        const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
            requestNonPersonalizedAdsOnly: false
        });
        var loaded = false;
        var gotReward = false;
        const eventListener = rewarded.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                rewarded.show();
                loaded = true;
            }
            else if (type === RewardedAdEventType.EARNED_REWARD) {
                gotReward = true;
            }
            else if (error) {
                console.warn(error);
            }
        });
        rewarded.load();
        while (!loaded) {
            await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        }
        return gotReward;
    }

    const earnCredit = () => {
        showRewarded().then( b =>
            {
                if(b) {
                    updateDenemeSayisi();
                }
            }
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <ScrollView style={{ flex: 1, backgroundColor: colors.background, width: '100%' }}>
                <View style={styles.userAvatar}>
                    <Avatar.Image source={{ uri: currentUser.ImageURL }} size={100} />
                    <Title>{user.displayName}</Title>
                    <Subheading>{currentUser.Email}</Subheading>
                    <Subheading style={{ fontSize: 19 }}>Kullanılabilir Puanınız : {currentUser.Points}</Subheading>
                    <Subheading style={{ fontSize: 19 }}>Krediniz : {currentUser.Credit}</Subheading>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <Text style={{color: colors.white, fontSize: 18}}>Reklam izleyerek kredi kazanabilirsiniz.</Text>
                    <View style={styles.buttonContainer}>
                        <View>
                            <TouchableOpacity style={styles.button1} onPress={earnCredit}>
                                <Text style={{ color: 'black', fontSize: 20 }}>İzle ve Kazan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    userAvatar: {
        width: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
        borderBottomWidth: 5,
    },
    inputCell: {
        width: '100%',
        marginStart: 10,
        marginTop: 10,
    },
    title: {
        marginStart: 5,
        fontSize: 18,
        color: colors.white,
    },
    button: {
        margin: 10,
        backgroundColor: colors.primary,
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button1: {
        padding: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 20,
        borderColor: colors.secondary,
        marginTop: 20,
    },
    buttonContainer: {
        width: '90%',
        flex: 1,
    }
})

export default BuyCredit;
