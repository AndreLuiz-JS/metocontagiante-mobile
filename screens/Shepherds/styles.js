import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';
import constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        marginTop: constants.statusBarHeight,
        padding: 0
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
})