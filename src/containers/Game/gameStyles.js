import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../themes'
import { NUMBER_COL } from '../../utils/constants'

const ITEM_SIZE = (Metrics.screenWidth - 2 * Metrics.screenPadding) / NUMBER_COL

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: Metrics.screenPadding,
    borderBottomWidth: 1,
    borderColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 40,
    color: Colors.white,
    fontWeight: 'bold',
  },
  flatList: {
    marginTop: 20,
  },
  contentContainerStyle: {
    marginTop: 20,
    marginHorizontal: Metrics.screenPadding,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  itemBtn: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  itemOdd: {
    backgroundColor: Colors.inactive,
  },
  itemRed: {
    backgroundColor: Colors.red,
  },
  itemGreen: {
    backgroundColor: Colors.green,
  },
  lock: {
    color: '#ccc',
  },
  headerButton: {
    flexDirection: 'row',
  },
  btnContainer: {
    marginLeft: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtn: {
    color: Colors.white,
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  clockTxt: {
    color: Colors.white,
    fontSize: 30,
    marginRight: 10,
  },
})