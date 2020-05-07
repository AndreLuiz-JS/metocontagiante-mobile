import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../constants/Colors';
const screenWidth = Dimensions.get('screen').width;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.background,
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
    cellContainer: {
        flex: 1,
        width: Dimensions.get('screen').width - 20,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    cellContent: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: 10,
        width: screenWidth - 20,
        color: colors.text,
        fontSize: 16,
        textAlign: 'left'
    },
    cellImage: {
        width: (screenWidth - 20) * 0.25,
        height: (screenWidth - 20) * 0.25 / 0.5625,
        borderRadius: 10,
        margin: 5,
    },
    cellInfoContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
        marginBottom: 10,
    },
    cellInfoItem: {
        color: colors.secondary,
    },
    cellName: {
        paddingTop: 10,
        color: colors.primary,
        textAlign: 'center',
        fontSize: 20,
    },
})