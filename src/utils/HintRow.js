import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome5';
import { colors } from './Constants';

const HintRow = ({ name, style, id, onPress }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <View style={styles.avatar}>
                <Text style={styles.avatarLabel}>
                    ?
                </Text>
            </View>
            <View style={styles.row}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {name + " " + id}
                    </Text>
                </View>
                <Icons name='arrow-circle-right' size={28} color={colors.white} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        width: '90%',
        marginStart: 30,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        borderColor: colors.hintBorder,
        paddingHorizontal: 16,
        paddingVertical: 10,
        zIndex: -1,
        backgroundColor: '#252525',
    },
    avatar: {
        position: 'absolute',
        width: 80,
        height: 80,
        backgroundColor: colors.hintBorder,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarLabel: {
        fontSize: 60,
        color: colors.hintAvatarLabel,
    },
    textContainer: {
        flex: 1,
        marginStart: 50,
    },
    text: {
        fontSize: 20,
        color: colors.white,
    },
})

export default HintRow;
