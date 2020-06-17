import { responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { Margin, Fonts, Background, Colors } from 'theme';
import { RFValue } from "react-native-responsive-fontsize";
const screenHeight = 680;
const fontFamily = 'Montserrat-Regular';
const fontBold = 'Montserrat-Bold';
// fontFamily: fontFamily,
//     fontSize: RFValue(6, screenHeight),
export default {
    content: {
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 5
    },
    expiredItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    expiredText: {
        width: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#bdc3c7',
        textAlign: 'center'
    },
    cvvItem: {
        flex: 1,
        paddingLeft: 5,
        alignItems: 'flex-end'
    },
    ccvText: {
        width: 80,
        borderBottomWidth: 1,
        textAlign: 'center'
    }
};
