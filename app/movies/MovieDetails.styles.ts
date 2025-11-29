import { colors } from '@/constants/colors'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    textView: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 20,
        paddingHorizontal: 20
    },
    header: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        color: colors.light['200'],
        fontSize: 14
    },
    backButton: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        marginHorizontal: 5,
        backgroundColor: colors.accent,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: '100%'
    },
    saveIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 99
    },
    saveIcon: {
        height: 20,
        width: 20
    },
    saveIconActive: {
        tintColor: colors.accent
    }
})

export default styles