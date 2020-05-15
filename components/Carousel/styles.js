import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    statsHead: {
        paddingTop: 10,
        paddingHorizontal: 12,
    },
    container: {
        width: '100%',
        shadowColor: '#fcfcfc',
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 5
        },
    },
    scrollView: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    bullets: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    bullet: {
        fontSize: 0,
        borderWidth: 4,
        borderColor: '#dfdfdf',
        backgroundColor: '#a1a1a1',
        alignContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    image: {
        borderRadius: 10
    }
});

export default styles;