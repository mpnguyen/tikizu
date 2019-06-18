import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../themes'

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
    fontSize: 30,
    color: Colors.white,
    fontWeight: 'bold',
  },
  flatList: {
    marginTop: 20,
  },
  contentContainerStyle: {
    marginTop: 20,
    marginHorizontal: Metrics.screenPadding,
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
  rankItem: {
    backgroundColor: Colors.secondary,
    marginBottom: 20,
    borderColor: Colors.secondaryDark,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreTxt: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  timeTxt: {
    color: Colors.white,
    fontSize: 16,
  },
  emptyTxt: {
    textAlign: 'center',    
    fontSize: 20,
    color: Colors.white,
    marginTop: 40,
  },
  activeItem: {
    borderWidth: 3,
    borderColor: '#fff',
  },
})