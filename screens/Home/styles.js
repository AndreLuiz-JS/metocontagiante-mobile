import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../constants/Colors';

const iconPadding = 5;
const iconMargin = 5;
const headerPadding = 10;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const iconSize = screenWidth / 3 - (iconPadding * 2 + iconMargin * 2);
const logoSize = screenHeight - (4 * iconSize) - (4 * (iconPadding * 2 + iconMargin * 2)) - headerPadding * 2;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.background,
        justifyContent: 'space-evenly'

    },
    logo: {
        width: logoSize,
        height: logoSize,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: logoSize + headerPadding * 2,
        marginBottom: headerPadding,
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
