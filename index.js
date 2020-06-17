/*
 * @format
 */
console.disableYellowBox = true;

import { AppRegistry } from 'react-native'
import App from './app/app'
import { name as appName } from './app.json'

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage)
// })
AppRegistry.registerComponent(appName, () => App)

// export default from './storybook';
