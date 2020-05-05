import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../constants/Colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 20,
        color: colors.primary,
        paddingTop: 15,
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    albumList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    album: {
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 10,
        padding: 20,
        marginVertical: 20,
    },
    albumImage: {
        width: '100%',
        height: 300,
        borderRadius: 10

    },
    albumTitle: {
        color: colors.secondary,
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 16,
        paddingTop: 10
    },
})
