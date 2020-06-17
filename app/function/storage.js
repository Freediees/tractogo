// import { AsyncStorage } from 'react-native';
// import { EncryptAES, DecryptAES } from '../Encrypt'
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage'

export async function localStorageEncrypt(key, value) {
  let _value = typeof value === 'string' ? value : JSON.stringify(value)
  await AsyncStorage.setItem(key, _value)
}

export async function localStorageDecrypt(key) {
  let _value = await AsyncStorage.getItem(key)

  return _value
}
