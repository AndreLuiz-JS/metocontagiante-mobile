import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';
import constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        marginTop: constants.statusBarHeight,
    },
    header: {
        paddingHorizontal: 10,
        paddingVertical: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: colors.primary,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    map: {
        flex: 1
    }
})