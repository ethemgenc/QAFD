import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../navigation/AuthProvider'
import { colors } from '../../utils/Constants'

const HomeScreen = ({ navigation }) => {
    const { signout, user } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../utils/image/AnaEkran.png')} style={styles.image} >
                <View style={styles.itemContainer}>
                    <View style={styles.button}>
                        <Button
                            onPress={()=>navigation.navigate('ProfileScreen')}
                            title='Profil'
                            style={styles.button}
                            color={colors.secondary}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={()=>navigation.navigate('ProfilComponent')}
                            title='Ayarlar'
                            style={styles.button}
                            color={colors.secondary}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={() => navigation.navigate('QuizComponent')}
                            title='Yardım'
                            style={styles.button}
                            color={colors.secondary}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        marginTop: 160,
        borderWidth: 0,
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        width: '40%',
        overflow: 'hidden',
        borderRadius: 20,
        marginBottom: 30,
        marginLeft: 10,

    },
    image: {
        //width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 56,
        textAlign: 'center',
        color: colors.white,
    },
})

export default HomeScreen;
