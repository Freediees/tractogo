import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'

function pad(num, size) {
  var s = num + ''
  while (s.length < size) s = '0' + s
  return s
}

function isNumeric(str) {
  return /^\d+$/.test(str)
}

function objectToQueryString(obj) {
  const qs = _.reduce(
    obj,
    (result, value, key) => {
      if (!_.isNull(value) && !_.isUndefined(value)) {
        if (_.isArray(value)) {
          result += _.reduce(
            value,
            (result1, value1) => {
              if (!_.isNull(value1) && !_.isUndefined(value1)) {
                result1 += key + '=' + value1 + '&'
                return result1
              } else {
                return result1
              }
            },
            ''
          )
        } else {
          result += key + '=' + value + '&'
        }
        return result
      } else {
        return result
      }
    },
    ''
  ).slice(0, -1)
  return qs
}

async function saveFilterFunc(payload) {
  await AsyncStorage.setItem('startDate', payload.startDate)
  await AsyncStorage.setItem('endDate', payload.endDate)
  await AsyncStorage.setItem('branchId', payload.branchId)
  await AsyncStorage.setItem('cityId', payload.cityId)
  await AsyncStorage.setItem('isWithDriver', payload.isWithDriver)
  await AsyncStorage.setItem('rentalPackage', payload.rentalPackage)
  await AsyncStorage.setItem('rentalDuration', payload.rentalDuration)
  await AsyncStorage.setItem('serviceTypeId', payload.serviceTypeId)
  await AsyncStorage.setItem('productServiceId', payload.productServiceId)
  await AsyncStorage.setItem('buId', payload.buId)
}

async function resetFilterFunc() {
  await AsyncStorage.removeItem('startDate')
  await AsyncStorage.removeItem('endDate')
  await AsyncStorage.removeItem('branchId')
  await AsyncStorage.removeItem('cityId')
  await AsyncStorage.removeItem('isWithDriver')
  await AsyncStorage.removeItem('rentalPackage')
  await AsyncStorage.removeItem('rentalDuration')
  await AsyncStorage.removeItem('serviceTypeId')
  await AsyncStorage.removeItem('buId')
}

async function saveFilterObject(payload) {
  await AsyncStorage.setItem('selectedCity', JSON.stringify(payload.selectedCity))
  await AsyncStorage.setItem('selectedDate', JSON.stringify(payload.selectedDate))
  await AsyncStorage.setItem('selectedEndDate', JSON.stringify(payload.selectedEndDate))
  await AsyncStorage.setItem('selectedDuration', JSON.stringify(payload.selectedDuration))
  await AsyncStorage.setItem('selectedDurationIndex', payload.selectedDurationIndex.toString())
  await AsyncStorage.setItem('selectedPackage', JSON.stringify(payload.selectedPackage))
  await AsyncStorage.setItem('selectedPackageIndex', payload.selectedPackageIndex.toString())
  await AsyncStorage.setItem('selectedHour', payload.selectedHour)
  await AsyncStorage.setItem('selectedMinute', payload.selectedMinute)
}

async function resetFilterObject() {
  await AsyncStorage.removeItem('selectedCity')
  await AsyncStorage.removeItem('selectedDate')
  await AsyncStorage.removeItem('selectedEndDate')
  await AsyncStorage.removeItem('selectedDuration')
  await AsyncStorage.removeItem('selectedDurationIndex')
  await AsyncStorage.removeItem('selectedPackage')
  await AsyncStorage.removeItem('selectedPackageIndex')
  await AsyncStorage.removeItem('selectedHour')
  await AsyncStorage.removeItem('selectedMinute')
}

async function getFilterObject() {
  const selectedCityJSON = await AsyncStorage.getItem('selectedCity')
  const selectedDateJSON = await AsyncStorage.getItem('selectedDate')
  const selectedEndDateJSON = await AsyncStorage.getItem('selectedEndDate')
  const selectedDurationJSON = await AsyncStorage.getItem('selectedDuration')
  const selectedDurationIndexJSON = await AsyncStorage.getItem('selectedDurationIndex')
  const selectedPackageJSON = await AsyncStorage.getItem('selectedPackage')
  const selectedPackageIndexJSON = await AsyncStorage.getItem('selectedPackageIndex')
  const selectedHourJSON = await AsyncStorage.getItem('selectedHour')
  const selectedMinuteJSON = await AsyncStorage.getItem('selectedMinute')
  const payload = {
    selectedCity: selectedCityJSON ? JSON.parse(selectedCityJSON) : null,
    selectedDate: selectedDateJSON ? JSON.parse(selectedDateJSON) : null,
    selectedEndDate: selectedEndDateJSON ? JSON.parse(selectedEndDateJSON) : null,
    selectedDuration: selectedDurationJSON ? JSON.parse(selectedDurationJSON) : null,
    selectedDurationIndex: selectedDurationIndexJSON ? parseInt(selectedDurationIndexJSON) : null,
    selectedPackage: selectedPackageJSON ? JSON.parse(selectedPackageJSON) : null,
    selectedPackageIndex: selectedPackageIndexJSON ? parseInt(selectedPackageIndexJSON) : null,
    selectedHour: selectedHourJSON || null,
    selectedMinute: selectedMinuteJSON || null,
  }
  console.log(payload)
  return payload
}

async function saveUserProfileObject(payload) {
  await AsyncStorage.setItem('userProfile', JSON.stringify(payload))
}

async function getUserProfileObject() {
  const userProfileJSON = await AsyncStorage.getItem('userProfile')
  const userProfileObject = JSON.parse(userProfileJSON)
  return userProfileObject
}

async function resetUserProfileObject() {
  await AsyncStorage.removeItem('userProfile')
}

async function setImage(key, payload) {
  await AsyncStorage.setItem(key, payload)
}

async function getImage(key) {
  const image = await AsyncStorage.getItem(key)
  return image
}

async function addNavCounter() {
  let counter = await AsyncStorage.getItem('navCounter')
  if (counter) {
    counter = parseInt(counter) + 1
    await AsyncStorage.setItem('navCounter', '' + counter)
  } else {
    counter = 1
    await AsyncStorage.setItem('navCounter', '' + counter)
  }
}

async function getNavCounter() {
  let counter = await AsyncStorage.getItem('navCounter')
  return counter
}

async function resetNavCounter() {
  await AsyncStorage.removeItem('navCounter')
}

export {
  saveFilterFunc,
  saveFilterObject,
  objectToQueryString,
  getFilterObject,
  resetFilterFunc,
  resetFilterObject,
  resetUserProfileObject,
  saveUserProfileObject,
  getUserProfileObject,
  pad,
  isNumeric,
  setImage,
  getImage,
  addNavCounter,
  getNavCounter,
  resetNavCounter,
}
