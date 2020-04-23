import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../constants/Colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: colors.background,
        justifyContent: 'space-evenly'

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 22,
        color: colors.primary,
        textAlign: 'center',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    ico: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary + 'aa',
        width: 100,
        height: 100,
        padding: 5,
        borderRadius: 8
    },
    text: {
        color: colors.text,
        fontSize: 12,
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 300,
        resizeMode: 'contain'
    },
    link: {
        color: colors.effect,
    }
});
