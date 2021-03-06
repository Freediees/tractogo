import React from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback, Image } from 'react-native';
import { Background, Border, Padding, Alignment, Fonts } from 'theme';

export default function Image({ src, styles }) {
  return <Image />
}

Image.defaultProps = {
  children: null,
  onPress: () => {},
};

Image.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};
