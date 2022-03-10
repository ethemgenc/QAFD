import React, { useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { colors } from '../utils/Constants'

export default Loading = () => {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background}}
        >
            <ActivityIndicator size="large" color={colors.secondary} />
        </View>
    );
};
