import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Cell = ({style, title, icon, tintColor, onPress}) => {
    return (
        <TouchableOpacity style={[styles.cell, style]} onPress={onPress}>
            <View style={[{backgroundColor: tintColor},styles.iconContainer]}>
                <Icon name={icon} size={24} color={'white'}/>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Icon name='greater-than' size={24}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginStart: 16,
        flex: 1,
    },
})

export default Cell;
