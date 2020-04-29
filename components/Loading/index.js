import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NineCubesLoader, TextLoader } from 'react-native-indicator';

import colors from '../../constants/Colors';

export default function Loading({ message = 'carregando' }) {
    const styles = StyleSheet.create({
        loading: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.backgroundSecondary + 'ee',
            zIndex: 99,
        },
        text: {
            fontSize: 14,
            color: colors.primary,
            padding: 5
        }
    });

    return (
        <View style={styles.loading}>
            <NineCubesLoader color={colors.effect} />
            <TextLoader text={message} textStyle={styles.text} />
        </View>
    );
}
