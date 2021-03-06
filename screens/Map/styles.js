import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';
import constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        marginTop: constants.statusBarHeight,
    },
    title: {
        fontSize: 20,
        color: colors.primary,
        paddingTop: 10,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 15,
        color: colors.secondary,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    map: {
        flex: 1,
        marginTop: 10,
    },
    footer: {
        padding: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: colors.effect + 'dd',
        padding: 5,
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        maxWidth: 250,
        borderWidth: 2,
        borderColor: colors.effect,
    },
    buttonText: {
        textAlign: 'center',
        color: colors.background,
    }
})