import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { View, Text, Picker, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SettingsActions from 'scenes/setting/store/actions'
import I18n from 'react-native-i18n'
import CenterView from 'components/molecules/centerView';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  header: {
    fontSize: 20,
    textAlign: 'left',
    marginVertical: 10,
    marginLeft: 10,
  },
  picker: {
    flex: 1,
    marginRight: 10,
  }
});

class SettingsScreen extends React.Component {

  render() {
    const {language, changeLanguage} = this.props
    const {setParams} = this.props.navigation

    const languageOptions = Object.keys(I18n.translations).map((lang, i) => {
      console.log(lang);
      console.log(I18n.translations[lang]);
      return (
        <Picker.Item key={ i }
                     label={ I18n.translations[lang].id }
                     value={ lang } />)
    })

    return (
      <CenterView>
        <View style={ styles.container }>
          <Text style={ styles.header }>
            { I18n.t('settings.language') }
          </Text>
          <Picker style={ styles.picker }
                  selectedValue={ language }
                  onValueChange={ this._languageChanged(changeLanguage, setParams) }>
            { languageOptions }
          </Picker>
        </View>
      </CenterView>
    )
  }

  _languageChanged = (changeLanguage, setParams) => (newLang) => {
    changeLanguage(newLang)
    setParams({
      title: I18n.t('settings.title', { locale: newLang })
    })
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.settings.language,
  }
}

const mapStateToDispatch = dispatch => ({
  changeLanguage: (newLang) => dispatch(SettingsActions.changeLanguage(newLang))
})

export default connect(mapStateToProps, mapStateToDispatch)(SettingsScreen)

SettingsScreen.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
}