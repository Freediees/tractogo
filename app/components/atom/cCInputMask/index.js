import React from 'react'
import { View, TextInput, Text } from 'react-native'
import PropTypes from 'prop-types'
import BaseComponent from './BaseComponent'
import styles from './styles'

export default class CCInputMask extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.isMount = true
  }

  componentWillUnmount() {
    this.isMount = false
  }

  onChangemm(value = '') {
    this.props.onChangeMonth(value)
    let _swithFocus = super.isChangeFocusMM(value)
    if (_swithFocus) {
      this.input_2.focus()
    }
  }

  onChangecyy(value = '') {
    this.props.onChangeYear(value)
    let _swithFocus = super.isChangeFocusYY(value)
    console.log(_swithFocus.toString())
    if (_swithFocus) this.input_3.focus()
  }

  onChangeCvvText(value = '') {
    this.props.onChangeCvv(value)
    // this.updateState({ cvv: value, ccvBorder: '#bdc3c7',yyBorder:'' })
    super.isChangeCVVText(value)
  }

  onSubmit() {
    const { mm, yy, cvv } = this.state

    if (!mm) {
      this.updateState({ mmBorder: '#e74c3c', titleColor: '#e74c3c' })
      this.input_1.focus()
    } else if (!yy) {
      this.updateState({ yyBorder: '#e74c3c', titleColor: '#e74c3c' })
      this.input_2.focus()
    } else if (!cvv) {
      this.updateState({ cvvBorder: '#e74c3c' })
      this.input_3.focus()
    } else {
      this.updateState({
        titleColor: '#bdc3c7',
        mmBorder: '#bdc3c7',
        yyBorder: '#bdc3c7',
        cvvBorder: '#bdc3c7',
      })
      this.props.onSubmit && this.props.onSubmit(mm, yy, cvv)
    }
  }

  render() {
    const { mm, yy, cvv, titleColor, mmBorder, yyBorder, cvvBorder, styleContent } = this.state
    return (
      <View style={{ ...styles.content, ...styleContent }}>
        <View style={{ width: 110 }}>
          <Text style={{ color: titleColor }}>{this.props.expiredLabel}</Text>
          <View style={styles.expiredItem}>
            <TextInput
              ref={(input) => {
                this.input_1 = input
              }}
              style={{ ...styles.expiredText, borderBottomColor: mmBorder }}
              keyboardType={'numeric'}
              placeholder="mm"
              placeholderTextColor="#bdc3c7"
              maxLength={2}
              numberOfLines={1}
              value={mm}
              onChangeText={(value) => this.onChangemm(value)}
              onSubmitEditing={() => this.onSubmit()}
            />
            <View>
              <Text style={{ color: '#bdc3c7' }}>/</Text>
            </View>
            <TextInput
              ref={(input) => {
                this.input_2 = input
              }}
              onFocus={() => this.validationMM()}
              style={{ ...styles.expiredText, borderBottomColor: yyBorder }}
              keyboardType={'numeric'}
              placeholder="yy"
              placeholderTextColor="#bdc3c7"
              maxLength={2}
              numberOfLines={1}
              value={yy}
              onChangeText={(value) => this.onChangecyy(value)}
              onSubmitEditing={() => this.onSubmit()}
            />
          </View>
        </View>

        <View style={{ flex: 1, paddingLeft: 5, alignItems: 'flex-end' }}>
          <Text style={{ width: 80, color: cvvBorder }}>CVV</Text>
          <TextInput
            ref={(input) => {
              this.input_3 = input
            }}
            onFocus={() => this.validationYY()}
            style={{ ...styles.ccvText, borderBottomColor: cvvBorder }}
            keyboardType="numeric"
            autoCapitalize="none"
            value={this.props.cvv}
            maxLength={4}
            placeholder="XXX"
            placeholderTextColor="#bdc3c7"
            value={cvv}
            onChangeText={(value) => this.onChangeCvvText(value)}
            onSubmitEditing={() => this.onSubmit()}
            returnKeyType="go"
          />
        </View>
      </View>
    )
  }
}

CCInputMask.defaultProps = {
  expiredLabel: 'Masa Berlaku',
  onChangeMonth: (a) => console.log(a),
  onChangeYear: (a) => console.log(a),
  onChangeCvv: (a) => console.log(a),
  onSubmit: (a, b, c) => console.log(a, b, c),
  styleContent: {},
}

CCInputMask.propTypes = {
  expiredLabel: PropTypes.string,
  onChangeMonth: PropTypes.func,
  onChangeYear: PropTypes.func,
  onChangeCvv: PropTypes.func,
  onSubmit: PropTypes.func,
  styleContent: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
}
