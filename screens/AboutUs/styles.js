import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/Colors';
import constants from 'expo-constants';

const imageWidth = Dimensions.get('screen').width - 20;
const imageHeight = imageWidth / 1.78;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        marginTop: constants.statusBarHeight,
        padding: 0
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
    image: {
        width: imageWidth,
        height: imageHeight,
        borderRadius: 10,
        justifyContent: 'center',
        resizeMode: 'center'
    },
    content: {
        padding: 10,
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: colors.primary,
    },
})