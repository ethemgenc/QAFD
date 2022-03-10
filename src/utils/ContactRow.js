import React from 'react'
import {  View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ContactRow = () => {
    return (
        <TouchableOpacity style={styles.row}>
            <View style={styles.avatar}>
                <Image source={require('../../utils/image/AnaEkran.png')} style={styles.avatarImage} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>User Name</Text>
                <Text style={styles.subtitle}>ardailhn@gmail.com</Text>
            </View>
            <Icon name='greater-than' style={{ fontSize: 20, color: 'black' }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    avatarImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: 'green',
    },
    textContainer: {
        flex: 1,
        marginStart: 16,
    },
    name: {
        fontSize: 16,
    },
    subtitle: {
        marginTop: 2,
        color: colors.grey,
    },
    button: {
        width: '40%',
        overflow: 'hidden',
        borderRadius: 20,
        marginBottom: 10,
        marginLeft: 10,
    },
    text: {

        fontSize: 24,
        color: colors.black,
    },
    sperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'red',
        marginStart: 10,
    },
})

export default ContactRow;
