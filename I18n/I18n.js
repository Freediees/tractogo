import I18n from 'react-native-i18n'

I18n.fallbacks = true

let languageCode = I18n.locale.substr(0, 2)

I18n.translations = {
  en: require('./en.json'),
  id: require('./id.json'),
}

switch (languageCode) {
  case 'af':
    I18n.translations.af = require('./af.json')
    break
  case 'am':
    I18n.translations.am = require('./am.json')
    break
  case 'ar':
    I18n.translations.ar = require('./ar.json')
    break
  case 'bg':
    I18n.translations.bg = require('./bg.json')
    break
  case 'id':
    I18n.translations.id = require('./id.json')
    break
}
