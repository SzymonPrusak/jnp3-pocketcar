/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors, ...args }) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        marginVertical: 5,
        backgroundColor: 'white',
      },
      tileView: {
        margin: 5,
        padding: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      expenseRow: {
        height: 60,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8,
      },
      damageRow: {
        height: 60,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 8,
      },
    }),
  }
}
