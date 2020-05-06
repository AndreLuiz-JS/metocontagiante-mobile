import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../constants/Colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.background,
        justifyContent: 'space-evenly'

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    icons: {
        width: Dimensions.get('screen').width,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        alignItems: 'center',
        minHeight: 200,
    },
    ico: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary + 'aa',
        width: Dimensions.get('window').width / 3 - 20,
        height: Dimensions.get('window').width / 3 - 20,
        padding: 5,
        margin: 5,
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
