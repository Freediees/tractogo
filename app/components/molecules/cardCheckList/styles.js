import { responsiveWidth as wp } from 'react-native-responsive-dimensions'
import { Margin, Fonts, Row, Colors } from 'theme'

/*
shadowColor: "#000",
shadowOffset:{
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
*/
export default {
  Container: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    width: wp(88),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent : 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    ...Margin.mb_8,
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  list: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Margin.mt_4,
    ...Margin.mb_8,
  },
  label: {
    // fontSize: 11,
    ...Fonts.f_10,
    paddingLeft: 5,
    fontWeight: '100',
  },
  priceLabel: {
    ...Fonts.f_10,
  },
  price: {
    ...Fonts.f_14,
    color: Colors.amber,
    paddingTop: '1%',
  },
  dayLabel: {
    ...Fonts.f_10,
    color: Colors.smoky_grey,
  },
  total: {
    paddingTop: '1%',
    ...Fonts.f_10,
    fontWeight: '100',
  },
}
