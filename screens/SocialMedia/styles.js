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
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 10
    },
    subTitle: {
        fontSize: 15,
        color: colors.secondary,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    linkContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        paddingVertical: 15,
    },
    links: {
        paddingHorizontal: 10,
        paddingVertical: 25,
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    },
    linkText: {
        fontSize: 20,
        color: colors.text,
        textTransform: 'capitalize',
        paddingHorizontal: 10
    },
    box: {
        flex: 1
    },
    button: {
        flexDirection: 'row',
        paddingBottom: 10,
        alignItems: 'center',
        width: 180,
    },
    instagram: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    facebook: {
        width: 50,
        height: 47,
        borderRadius: 5,
        backgroundColor: '#3b5998',
        color: 'white',
        textAlign: 'right',
        paddingTop: 3
    },
    youtube: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#c4302b',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    twitter: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#00aced',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    spotify: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#1DB954',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})