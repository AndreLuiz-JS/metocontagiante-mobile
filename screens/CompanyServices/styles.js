import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../constants/Colors';

const iconPadding = 5;
const iconMargin = 5;
const headerPadding = 10;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const iconSize = screenWidth / 2 - (iconPadding * 2 + iconMargin * 2);
const logoSize = screenHeight - (4 * iconSize) - (4 * (iconPadding * 2 + iconMargin * 2)) - headerPadding * 2;

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
    serviceContainer: {
        flex: 1,
        width: Dimensions.get('screen').width - 20,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 20
    },
    serviceContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 10,
        width: screenWidth - 20,
        color: colors.text,
        fontSize: 16,
        textAlign: 'left',
        padding: 10,
    },
    serviceImage: {
        width: (screenWidth - 20) * 0.25,
        height: (screenWidth - 20) * 0.25 / 0.5625,
        borderRadius: 10,
        marginBottom: 15,
    },
    serviceInfoContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
    },
    serviceInfoItem: {
        color: colors.secondary,
    },
    serviceName: {
        color: colors.primary,
        textAlign: 'center',
        fontSize: 20,
    },
    button: {
        backgroundColor: colors.effect + 'dd',
        padding: 5,
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        borderWidth: 2,
        borderColor: colors.effect,
    },
    buttonText: {
        textAlign: 'center',
        color: colors.background,
    },
    serviceDetailContainer: {
        flex: 1,
        width: Dimensions.get('screen').width - 20,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        paddingTop: 5
    },
    serviceDetail: {
        color: colors.secondary,
        fontSize: 16,
        marginBottom: 10,
    },
    serviceDetailInfo: {
        color: colors.text,
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center'
    },
    hidden: {
        display: "none"
    },
    icons: {
        width: screenWidth,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        alignItems: 'center',
    },
    ico: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary + 'aa',
        width: iconSize,
        height: iconSize,
        padding: iconPadding,
        margin: iconMargin,
        borderRadius: 8,
    },
})