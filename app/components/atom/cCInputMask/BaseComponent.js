import React from 'react'
import { View, TextInput, Text } from 'react-native'
import PropTypes from 'prop-types'
import { responsiveWidth as wp } from 'react-native-responsive-dimensions'
import CenterView from 'components/molecules/centerView'
import { Colors } from 'theme'

export default class BaseComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.isMount = true
    this.state = {
      mm: '',
      yy: '',
      cvv: '',
      titleColor: '#bdc3c7',
      mmBorder: '#bdc3c7',
      yyBorder: '#bdc3c7',
      cvvBorder: '#bdc3c7',
      bordercolor: '#bdc3c7',
    }
  }

  updateState(state) {
    if (this.isMount) this.setState(state)
  }

  isChangeFocusMM(value) {
    let _swithFocus = false
    _swithFocus = value.length > 1
    // this.updateState({ mm: value, mmBorder: '#bdc3c7' })
    this.updateState({ mm: value, mmBorder: Colors.amber })

    return _swithFocus
  }

  isChangeFocusYY(value) {
    let _swithFocus = false
    _swithFocus = value.length > 1
    // this.updateState({ yy: value, yyBorder: '#bdc3c7',mmBorder:'#bdc3c7' })
    this.updateState({ yy: value, yyBorder: Colors.amber, mmBorder: '#bdc3c7' })

    return _swithFocus
  }

  isChangeCVVText(value) {
    this.updateState({ cvv: value, cvvBorder: Colors.amber, yyBorder: '#bdc3c7' })
  }

  validationMM() {
    if (this.state.mm) {
      let _number = Number(this.state.mm)
      let _value =
        _number < 1 ? '01' : _number > 12 ? '12' : _number < 10 ? `0${_number}` : _number.toString()
      this.updateState({ mm: _value, mmBorder: '#bdc3c7' })
      console.log(_value)
    }
  }

  validationYY() {
    if (this.state.yy) {
      let _number = Number(this.state.yy)
      let _value = _number < 10 ? `0${_number}` : _number.toString()
      this.updateState({ yy: _value, yyBorder: '#bdc3c7' })
      console.log(_value)
    }
  }
}

BaseComponent.propTypes = {
  onSubmit: PropTypes.func,
}
