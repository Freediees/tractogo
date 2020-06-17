import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import PrimaryButton from 'components/atom/primaryButton'
import CheckBox from 'components/atom/checkBox'
import { Margin, Fonts, Colors, Padding } from 'theme'
import { LabelNumberFormat } from 'function/numberFormat'

const borderStyle = {
  backgroundColor: Colors.white,
  borderBottomWidth: 1,
  borderBottomColor: Colors.light_grey,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 1,
}

export default function CheckOutFooter({
  selectedLabel,
  isCheckOut,
  onCheckChange,
  amountLabel,
  amountValue,
  count,
  mainLabel,
  secondLabel,
  border,
  onDeleteButtonPress,
  onCheckoutPress,
  isAll,
  changeAll,
}) {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          height: 70,
          flexDirection: 'row',
        },
        border ? borderStyle : {},
      ]}
    >
      <View style={{ flex: 1, ...Padding.ph_16 }}>
        <CheckBox
          checked={isAll}
          onCheck={(val) => changeAll(val)}
          renderHeader={() => {
            return <Text>{selectedLabel}</Text>
          }}
        />
      </View>

      {isCheckOut ? (
        <View
          style={{
            flex: 1,
            ...Padding.pl_4,
            ...Padding.pr_8,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <View style={{ alignItems: 'flex-end', ...Padding.pr_8 }}>
            <Text style={{ ...Fonts.f_14 }}>{amountLabel}</Text>
            <LabelNumberFormat
              number={amountValue}
              style={{ ...Fonts.f_14, color: Colors.amber }}
            />
          </View>
          <View style={{}}>
            <PrimaryButton
              style={{ ...Margin.mv_8 }}
              text={`${mainLabel} (${count})`}
              onPress={() => {
                onCheckoutPress()
              }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            ...Padding.pl_4,
            ...Padding.pr_8,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <View>
            <PrimaryButton
              style={{ ...Margin.mv_8 }}
              text={secondLabel}
              onPress={() => {
                onDeleteButtonPress()
              }}
            />
          </View>
        </View>
      )}
    </View>
  )
}

CheckOutFooter.defaultProps = {
  selectedLabel: 'Semua',
  isCheckOut: true,
  amountLabel: 'Total',
  amountValue: 'Rp. 350.000',
  count: 1,
  mainLabel: `Checkout`,
  secondLabel: `Delete`,
  onCheckChange: () => {},
  border: false,
  onDeleteButtonPress: () => {},
  onCheckoutPress: () => {},
  isAll: false,
  changeAll: () => {},
}

CheckOutFooter.proptypes = {
  selectedLabel: PropTypes.string,
  isCheckOut: PropTypes.bool,
  amountLabel: PropTypes.string,
  amountValue: PropTypes.string,
  count: PropTypes.number,
  mainLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  onCheckChange: PropTypes.func,
  border: PropTypes.bool,
  onDeleteButtonPress: PropTypes.func,
  onCheckoutPress: PropTypes.func,
  isAll: PropTypes.bool,
  changeAll: PropTypes.func,
}
