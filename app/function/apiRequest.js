import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'

async function defineHeaders() {
  const AUTH = AsyncStorage.getItem('token')
  const LANG = AsyncStorage.getItem('lang')
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': LANG || 'id',
  }
  if (AUTH) headers.Authorization = AUTH
  return headers
}

export { defineHeaders }
