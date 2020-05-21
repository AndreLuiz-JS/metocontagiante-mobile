import { StyleSheet } from 'react-native';
import colors from '../../../constants/Colors';
import constants from 'expo-constants';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        marginTop: constants.statusBarHeight,
        padding: 0
    },
    headerTitle: {
        color: colors.primary,
        fontSize: 25,
        textAlign: 'center'
    },
    headerSubTitle: {
        color: colors.secondary,
        fontSize: 15,
        textAlign: 'center',
        paddingBottom: 10
    },
    adverts: {
        flex: 1,
    },
})