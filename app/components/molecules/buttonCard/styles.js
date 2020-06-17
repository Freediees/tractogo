import {
    Border,
    Padding,
    Alignment,
    Flex,
    Justify,
    Margin,
  } from 'theme'

export default {
    main: {
        ...Margin.mh_16,
        flexDirection: 'row',
        ...Border.border_rad_8,           
    },
    content: {
        ...Padding.ph_8,
        ...Padding.pv_8,
        ...Flex.flex_1,
        ...Alignment.align_center,
        ...Justify.Justify_center,
        flexDirection: 'row',  
    ...Border.border_rad_8,
    },
};
