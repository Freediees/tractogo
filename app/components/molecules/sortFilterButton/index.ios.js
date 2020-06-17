import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'

import PrimaryButton from 'components/atom/primaryButton'

import CustomBottomSheet from 'components/molecules/customBottomSheet'
import Separator from 'components/atom/separator'
import CustomRangeSlider from 'components/atom/customRangeSlider'
import CustomChipPicker from 'components/atom/customChipPicker'
import { Padding, Margin, Background, Fonts, Row, Column } from 'theme'

import iconFilter from 'icons/ic-filter.svg'
import iconSort from 'icons/ic-urutkan.svg'

import iconCheckList from 'icons/ic-checklist.svg'

const styles = StyleSheet.create({
  activeLeftText: {
    ...Fonts.f_14,
    ...Fonts.text_blue,
  },
  defaultLeftText: {
    ...Fonts.f_14,
    ...Fonts.text_black,
  },
})

export default function SortFilterButton({
  sortLabel,
  filterLabel,
  onSortPress,
  onFilterPress,
  height,
  sortItems,
  selectedSortItem,
  selectedSortIndex,
  changeSelectedSortItem,
  buttonCloseLabel,
  selectedMin,
  selectedMax,
  changeSelectedMin,
  changeSelectedMax,
  minRange,
  maxRange,
  chipItems,
  selectedChipItem,
  selectedChipIndex,
  onSelectChipItem,
  sortTitleLabel,
  filterTitleLabel,
  rangeFilterLabel,
  chipPickerLabel,
  style,
}) {
  let bsSort = null
  let bsFilter = null

  const renderSortItem = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          style={{ width: '100%', ...Margin.mt_8, ...Padding.ph_16, ...Padding.pv_4 }}
          onPress={() => changeSelectedSortItem(item, index)}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <View style={{ flex: 11, alignItems: 'center' }}>
              <Text
                style={index === selectedSortIndex ? styles.activeLeftText : styles.defaultLeftText}
              >
                {item.label}
              </Text>
            </View>
            {index === selectedSortIndex && (
              <View style={{ position: 'absolute', zIndex: 1, right: 0 }}>
                <SvgXml xml={iconCheckList} height={24} width={24} />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Separator style={{ ...Margin.mt_8 }} />
      </View>
    )
  }

  return (
    <View
      style={{
        zIndex: 100,
        position: 'absolute',
        bottom: '7%',
        ...Background.bg_blue,
        borderRadius: 16,
        justifyContent: 'space-between',
        ...Padding.ph_20,
        flexDirection: 'row',
        height: height,
        ...style,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (bsSort !== null) bsSort.open()
        }}
      >
        <View
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
          <SvgXml xml={iconSort} height={16} width={16} style={{ ...Margin.mr_4 }} />
          <Text style={{ ...Fonts.f_12, ...Fonts.text_white }}>{sortLabel}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ ...Background.bg_white, width: 1, height: '100%', ...Margin.mh_20 }} />
      <TouchableOpacity
        onPress={() => {
          if (bsFilter !== null) bsFilter.open()
        }}
      >
        <View
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
          <SvgXml xml={iconFilter} height={16} width={16} style={{ ...Margin.mr_4 }} />
          <Text style={{ ...Fonts.f_12, ...Fonts.text_white }}>{filterLabel}</Text>
        </View>
      </TouchableOpacity>
      <CustomBottomSheet title={sortTitleLabel} botSheetRef={(ref) => (bsSort = ref)}>
        <View style={{ ...Row.row_1_5, width: '100%' }}>
          {sortItems &&
            sortItems.map((v, i) => {
              return renderSortItem(v, i)
            })}
          <View style={{ ...Margin.mt_20, ...Padding.ph_20 }}>
            <PrimaryButton
              onPress={() => {
                onSortPress(selectedSortItem, selectedSortIndex)
                if (bsSort) {
                  bsSort.close()
                }
              }}
              text={buttonCloseLabel}
            />
          </View>
        </View>
      </CustomBottomSheet>
      <CustomBottomSheet title={filterTitleLabel} botSheetRef={(ref) => (bsFilter = ref)}>
        <View style={{ width: '100%', ...Row.row_1_5, ...Padding.ph_20 }}>
          <Text style={{ ...Fonts.f_12, ...Fonts.bold }}>{rangeFilterLabel}</Text>
          <View style={{ ...Margin.mt_20, ...Padding.ph_20 }}>
            <CustomRangeSlider
              selectedMin={selectedMin}
              selectedMax={selectedMax}
              changeSelectedMin={changeSelectedMin}
              changeSelectedMax={changeSelectedMax}
              minRange={minRange}
              maxRange={maxRange}
            />
          </View>
        </View>
        <Separator style={{ ...Margin.mv_16 }} />
        <View style={{ ...Padding.ph_20, ...Row.row_1_5 }}>
          <Text style={{ ...Fonts.f_12, ...Fonts.bold }}>{chipPickerLabel}</Text>
          <View style={{ ...Margin.mt_8 }}>
            <CustomChipPicker
              items={chipItems}
              selectedItem={selectedChipItem}
              selectedIndex={selectedChipIndex}
              onSelectItem={onSelectChipItem}
            />
          </View>
        </View>
        <View style={{ ...Margin.mt_16, ...Padding.ph_20 }}>
          <PrimaryButton
            onPress={() => {
              onFilterPress(selectedMin, selectedMax, selectedChipItem)
              if (bsFilter) {
                bsFilter.close()
              }
            }}
            text={buttonCloseLabel}
          />
        </View>
      </CustomBottomSheet>
    </View>
  )
}

SortFilterButton.defaultProps = {
  sortLabel: 'Urutkan',
  filterLabel: 'Filter',
  onSortPress: () => {},
  onFilterPress: () => {},
  style: {},
  height: 36,
  sortItems: [
    {
      value: 0,
      label: 'Harga Terendah',
    },
    {
      value: 1,
      label: 'Harga Tertinggi',
    },
    {
      value: 2,
      label: 'Kapasitas Penumpang Terkecil',
    },
    {
      value: 3,
      label: 'Kapasitas Penumpang Terbesar',
    },
  ],
  selectedSortItem: {
    value: 0,
    label: 'Harga Terendah',
  },
  selectedSortIndex: 0,
  changeSelectedSortItem: () => {},
  buttonCloseLabel: 'Tutup',
  selectedMin: 200000,
  selectedMax: 400000,
  changeSelectedMin: () => {},
  changeSelectedMax: () => {},
  minRange: 0,
  maxRange: 1000000,
  chipItems: [
    {
      value: 0,
      label: 'Semua',
    },
    {
      value: 1,
      label: '4 Penumpang',
    },
    {
      value: 2,
      label: '5-6 Penumpang',
    },
    {
      value: 3,
      label: '> 6 Penumpang',
    },
  ],
  selectedChipItem: {
    value: 0,
    label: 'Semua',
  },
  selectedChipIndex: 0,
  onSelectChipItem: () => {},
  sortTitleLabel: 'Urutkan Berdasarkan',
  filterTitleLabel: 'Filter',
  rangeFilterLabel: 'Kisaran Harga per Hari',
  chipPickerLabel: 'Kapasitas Penumpang',
}

SortFilterButton.propTypes = {
  sortLabel: PropTypes.string,
  filterLabel: PropTypes.string,
  onSortPress: PropTypes.func,
  onFilterPress: PropTypes.func,
  style: PropTypes.shape({}),
  height: PropTypes.number,
  sortItems: PropTypes.arrayOf(PropTypes.shape({})),
  selectedSortItem: PropTypes.shape({}),
  selectedSortIndex: PropTypes.number,
  changeSelectedSortItem: PropTypes.func,
  buttonCloseLabel: PropTypes.string,
  selectedMin: PropTypes.number,
  selectedMax: PropTypes.number,
  changeSelectedMin: PropTypes.func,
  changeSelectedMax: PropTypes.func,
  minRange: PropTypes.number,
  maxRange: PropTypes.number,
  sortTitleLabel: PropTypes.string,
  filterTitleLabel: PropTypes.string,
  rangeFilterLabel: PropTypes.string,
  chipPickerLabel: PropTypes.string,
}
