import { responsiveWidth } from 'react-native-responsive-dimensions'
import { Fonts, ImageSize, Margin, Padding } from 'theme'

export default {
  contentHeader: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    elevation: 0,
    //shadowRadius: 5,
    borderBottomRadius: 100,
  },
  contentlayer: {
    ...Padding.ph_8,
    ...Padding.pv_20,
    backgroundColor: 'rgb(230,237,255)',
    flexDirection: 'column',
    zIndex: 999,
  },
  contentProfile: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  backElipse: {
    flex: 1,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}
