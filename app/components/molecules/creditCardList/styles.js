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
        height:50,
        overflow:'hidden',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        // borderRadius: 10,
        ...Margin.mb_8
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
        flexDirection: 'column',
        // justifyContent: 'space-be',//evenly                
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

};
