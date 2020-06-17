import { responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { Margin, Fonts, Background, Colors } from 'theme';

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
        backgroundColor: '#FFF',
        width: wp(100),
        height: 50,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        ...Margin.mb_8,
        borderRadius: 0,
    },
    ContainerActive: {
        width: wp(88),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    },
    Content: {
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    listbox: {
        position: 'absolute',
        top: 15,
    },
    list: {
        width: '30%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        // borderWidth: 1,
        margin: 5

    },
    label: {
        // fontSize: 11,
        ...Fonts.f_10,
        paddingLeft: 5,
        fontWeight: '100'
    },
    hr: {
        backgroundColor: '#ecf0f1',
        marginTop: 10,
        marginBottom: 10,
        height: 1,
    }

};
