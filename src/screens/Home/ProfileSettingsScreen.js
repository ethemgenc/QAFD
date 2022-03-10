import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Avatar, Subheading, Title } from 'react-native-paper'
import { AuthContext } from '../../navigation/AuthProvider'
import { colors } from '../../utils/Constants'
import firestore from '@react-native-firebase/firestore'
import Icons from 'react-native-vector-icons/FontAwesome5';
import Loading from '../../utils/Loading'

const ProfileSettingsScreen = () => {
    const { signout, user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const usersColl = firestore().collection('users');
    const [isLoading, setIsLoading] = useState(false);
    const [newName, onChangeNewName] = useState("");
    const [newLastName, onChangeNewLastName] = useState("");
    const [newUserName, onChangeNewUserName] = useState("");

    const updateName = async () => {
        setIsLoading(true)
        await usersColl.doc(user.uid).update({
            Name : newName
        })
        setIsLoading(false)
        alert('Adınızı değiştirdiniz.');
    }

    const updateLastName = async () => {
        setIsLoading(true)
        await usersColl.doc(user.uid).update({
            LastName : newLastName
        })
        setIsLoading(false)
        alert('Soyadınızı değiştirdiniz.');
    }

    const updateUserName = async () => {
        setIsLoading(true)
        await usersColl.doc(user.uid).update({
            UserName : newUserName
        })
        setIsLoading(false)
        alert('Kullanıcı adınızı değiştirdiniz.');
    }

    useEffect(() => {
        usersColl
            .doc(user.uid)
            .get()
            .then((data) => {
                setCurrentUser(data.data())
            })
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <ScrollView style={{ flex: 1, backgroundColor: colors.background, width: '100%', }}>
                <View style={styles.userAvatar}>
                    <Avatar.Image source={{ uri: currentUser.ImageURL }} size={100} />
                    <Title>{user.displayName}</Title>
                    <Subheading>{currentUser.Email}</Subheading>
                </View>

                <View style={styles.inputCell}>
                    <Text style={styles.title}>Adınızı Değiştirin</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={currentUser.Name}
                            onChangeText={onChangeNewName}
                            value={newName}
                        />
                        <TouchableOpacity style={styles.button} onPress={updateName}>
                            <Icons name='chevron-circle-right' size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputCell}>
                    <Text style={styles.title}>Soyadınızı Değiştirin</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={currentUser.LastName}
                            onChangeText={onChangeNewLastName}
                            value={newLastName}
                        />
                        <TouchableOpacity style={styles.button} onPress={updateLastName}>
                            <Icons name='chevron-circle-right' size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputCell}>
                    <Text style={styles.title}>Kullanıcı Adınızı Değiştirin</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={currentUser.UserName}
                            onChangeText={onChangeNewUserName}
                            value={newUserName}
                        />
                        <TouchableOpacity style={styles.button} onPress={updateUserName}>
                            <Icons name='chevron-circle-right' size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

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
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    input: {
        backgroundColor: colors.white,
        fontSize: 18,
        height: 45,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderColor: colors.hintAvatarLabel,
        padding: 10,
        width: '85%',
        //position: 'absolute',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: 40,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: colors.hintAvatarLabel,
        backgroundColor: 'white',
    }
})

export default ProfileSettingsScreen;
