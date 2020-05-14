import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/Colors';
import constants from 'expo-constants';

const iconSize = 50;
const iconRadius = 25;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        marginTop: constants.statusBarHeight,
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
    linkContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        paddingVertical: 15,
    },
    links: {
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 10,
        margin: 10
    },
    linkText: {
        fontSize: 20,
        color: colors.text,
        textTransform: 'capitalize',
        paddingHorizontal: 10,
        width: Dimensions.get('screen').width - iconSize - 40,
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
        width: iconSize,
        height: iconSize,
        borderRadius: iconRadius
    },
    facebook: {
        width: iconSize,
        height: iconSize,
        borderRadius: iconRadius,
        backgroundColor: '#3b5998',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    youtube: {
        width: iconSize,
        height: iconSize,
        borderRadius: iconRadius,
        backgroundColor: '#c4302b',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    goooglePodcast: {
        width: iconSize,
        height: iconSize,
        borderRadius: iconRadius,
        backgroundColor: '#00aced',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    spotify: {
        width: iconSize,
        height: iconSize,
        borderRadius: iconRadius,
        backgroundColor: '#1DB954',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})