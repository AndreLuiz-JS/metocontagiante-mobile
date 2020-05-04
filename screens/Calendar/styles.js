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
    noEvent: {
        fontSize: 20,
        color: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30,
        textTransform: 'uppercase'
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
    events: {
        flex: 1,
    },
    eventContainer: {
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 10,
        marginVertical: 10
    },
    event: {
        alignItems: 'center',
        padding: 10
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: colors.primary,
        paddingTop: 20,
        fontSize: 19,
        textAlign: 'center'
    },
    description: {
        color: colors.secondary,
        textAlign: 'justify',
        padding: 20
    },
    date: {
        color: colors.primary,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
})