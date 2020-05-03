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
    form: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: colors.background,

    }
})