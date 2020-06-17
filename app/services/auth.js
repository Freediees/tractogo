/* eslint-disable no-return-await */
import axios from 'axios'
import { Config } from 'config/index.dev'
import { LOGIN_SOSMED, LOGIN_VERIFY } from 'config'
import { generateSocialitePayload } from 'function/payloadGenerator'

export const postLoginRequest = async (payload) => {
  console.log('postLoginRequest: ', JSON.stringify(Config.API_URL))
  return await axios
    .post(
      `${Config.API_URL}confirmation`, // login-phone-number`,
      {
        NoHandphone: payload.NoHandphone,
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
      {
        NoHandphone: payload.NoHandphone,
        OtpCode: payload.OtpCode,
      },
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
  const newPayload = await generateSocialitePayload(payload)
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
        EmailPersonal: payload.EmailPersonal,
        NoHandphone: payload.NoHandphone,
        FirstName: payload.FirstName,
        LastName: payload.LastName,
        BirthDate: payload.BirthDate,
        Gender: payload.Gender,
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

export const postRegisterVerify = async (payload) => {
  return axios
    .post(
      `${Config.API_URL}confirmation-register`,
      {
        NoHandphone: payload.NoHandphone,
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
        NoHandphone: payload.NoHandphone,
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
