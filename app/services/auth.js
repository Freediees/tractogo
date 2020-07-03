/* eslint-disable no-return-await */
import axios from 'axios'
import { Config } from 'config/index.dev'
import { LOGIN_SOSMED, LOGIN_VERIFY, POST_REGISTER_GOOGLE, USER } from 'config'
import { generateSocialitePayload } from 'function/payloadGenerator'

export const postLoginRequest = async (payload) => {
  console.log(payload)
  console.log('postLoginRequest: ', JSON.stringify(Config.API_URL))
  return await axios
    .post(
      `${Config.API_URL}confirmation`, // login-phone-number`,
      {
        NoHandphone: payload.payload.NoHandphone,
        OtpCode: '1234', // sementara
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response)
    .catch((error) => error)
}

export const postLoginVerify = async (payload) => {
  console.log('verifes')
  console.log(payload)
  console.log('postLoginRequest: ', JSON.stringify(LOGIN_VERIFY))
  return await axios
    .post(
      `${LOGIN_VERIFY}`, // login-phone-number`,
      payload.payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      console.log(error)
      return error
    })
}

export const postLoginSocialiteRequest = async (payload) => {
  const newPayload = await generateSocialitePayload(payload.payload)
  console.log('postLoginRequest: ', JSON.stringify(Config.API_URL))
  return axios
    .post(LOGIN_SOSMED, newPayload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response)
    .catch((error) => error)
}

export const postRegisterRequest = async (payload) => {
  console.log(`${Config.API_URL}register-phone-number`)
  return axios
    .post(
      `${Config.API_URL}register-phone-number`,
      {
        EmailPersonal: payload.payload.EmailPersonal,
        NoHandphone: payload.payload.NoHandphone,
        FirstName: payload.payload.FirstName,
        LastName: payload.payload.LastName,
        BirthDate: payload.payload.BirthDate,
        Gender: payload.payload.Gender,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response)
    .catch((error) => error)
}

export const postRegisterGoogleRequest = async (payload) => {
  console.log('user: ', JSON.stringify(payload.payload.payload))
  console.log('token: ', payload.payload.token)
  return axios
    .post(`${POST_REGISTER_GOOGLE}`, payload.payload.payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.payload.token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error)
}

export const postRegisterVerify = async (payload) => {
  return axios
    .post(
      `${Config.API_URL}confirmation-register`,
      {
        NoHandphone: payload.payload.NoHandphone,
        OtpCode: '1234', // SEMENTARA NUNGGU ID NEXMO
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response)
    .catch((error) => error)
}

export const postRetryOTP = async (payload) => {
  return axios
    .post(
      `${Config.API_URL}retry-otp`,
      {
        NoHandphone: payload.payload.NoHandphone,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response)
    .catch((error) => error)
}
