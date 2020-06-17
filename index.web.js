import { AppRegistry } from 'react-native'
import App, { name as appName } from './app'

AppRegistry.registerComponent(appName, () => App)
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('react-app'),
})

if (module.hot) {
  module.hot.accept()
}
