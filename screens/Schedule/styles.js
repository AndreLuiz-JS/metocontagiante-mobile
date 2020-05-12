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
    headerTitle: {
        color: colors.primary,
        fontSize: 17,
        textAlign: 'center'
    },
    headerSubTitle: {
        color: colors.secondary,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: colors.backgroundSecondary,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        width: 150
    },
    buttonSelected: {
        backgroundColor: colors.effect + 'aa',
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.effect,
        marginTop: 10,
        width: 150,
    }
})