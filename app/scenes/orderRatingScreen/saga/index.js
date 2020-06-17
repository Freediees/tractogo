import { call, put } from 'redux-saga/effects'
import RatingAction from '../store/actions'
import { fetchUpdateProfile } from 'services/profileService'

export function* fetchRatingInfo(payload) {
  console.log('Get rating information')

  const data = {
    sopir: [
      {
        rating: 1,
        generalLabel: 'Beritahu kami apa yang salah dari sopir',
        generalInfo: 'Sopir sangat buruk',
        detailInfo: [
          { title: 'Terlambat menjemput' },
          { title: 'Penampilan tidak rapih' },
          { title: 'Tidak bisa membaca navigasi' },
          { title: 'Menyetir tidak aman' },
          { title: 'Komunikasi buruk' },
          { title: 'Sikap yang buruk' },
        ],
      },
      {
        rating: 2,
        generalLabel: 'Beritahu kami apa yang salah dari sopir',
        generalInfo: 'Sopir buruk',
        detailInfo: [
          { title: 'Terlambat menjemput' },
          { title: 'Penampilan tidak rapih' },
          { title: 'Tidak bisa membaca navigasi' },
          { title: 'Menyetir tidak aman' },
          { title: 'Komunikasi buruk' },
          { title: 'Sikap yang buruk' },
        ],
      },
      {
        rating: 3,
        generalLabel: 'Apa yang dapat sopir tingkatkan',
        generalInfo: 'Sopir cukup baik',
        detailInfo: [
          { title: 'Tepat waktu' },
          { title: 'Penampilan sopir' },
          { title: 'Membaca navigasi' },
          { title: 'Keamanan menyetir' },
          { title: 'Komunikasi sopir' },
          { title: 'Sikap sopir' },
        ],
      },
      {
        rating: 4,
        generalLabel: 'Apa yang menurut anda baik dari sopir',
        generalInfo: 'Sopir baik',
        detailInfo: [
          { title: 'Tepat waktu' },
          { title: 'Penampilan sopir' },
          { title: 'Membaca navigasi' },
          { title: 'Keamanan menyetir' },
          { title: 'Komunikasi sopir' },
          { title: 'Sikap sopir' },
        ],
      },
      {
        rating: 5,
        generalLabel: 'Apa yang menurut anda baik dari sopir',
        generalInfo: 'Sopir sangat baik',
        detailInfo: [
          { title: 'Tepat waktu' },
          { title: 'Penampilan sopir' },
          { title: 'Membaca navigasi' },
          { title: 'Keamanan menyetir' },
          { title: 'Komunikasi sopir' },
          { title: 'Sikap sopir' },
        ],
      },
    ],
    kendaraan: [
      {
        rating: 1,
        generalLabel: 'Beritahu kami apa yang salah dari kendaraan',
        generalInfo: 'Kendaraan sangat buruk',
        detailInfo: [
          { title: 'Kendaraan Buruk banget' },
          { title: 'Kendaraan Buruk' },
          { title: 'Kasih bintang satu' },
          { title: 'Mengemudi ugal-ugalan' },
        ],
      },
      {
        rating: 2,
        generalLabel: 'Beritahu kami apa yang salah dari kendaraan',
        generalInfo: 'Kendaraan sangat buruk',
        detailInfo: [
          { title: 'Kendaraan Buruk banget' },
          { title: 'Kendaraan Buruk' },
          { title: 'Kasih bintang satu' },
          { title: 'Mengemudi ugal-ugalan' },
        ],
      },
      {
        rating: 3,
        generalLabel: 'Beritahu kami apa yang salah dari kendaraan',
        generalInfo: 'Kendaraan sangat buruk',
        detailInfo: [
          { title: 'Kendaraan Buruk banget' },
          { title: 'Kendaraan Buruk' },
          { title: 'Kasih bintang satu' },
          { title: 'Mengemudi ugal-ugalan' },
        ],
      },
      {
        rating: 4,
        generalLabel: 'Beritahu kami apa yang salah dari kendaraan',
        generalInfo: 'Kendaraan sangat buruk',
        detailInfo: [
          { title: 'Kendaraan Buruk banget' },
          { title: 'Kendaraan Buruk' },
          { title: 'Kasih bintang satu' },
          { title: 'Mengemudi ugal-ugalan' },
        ],
      },
      {
        rating: 5,
        generalLabel: 'Beritahu kami apa yang salah dari kendaraan',
        generalInfo: 'Kendaraan sangat buruk',
        detailInfo: [
          { title: 'Kendaraan Buruk banget' },
          { title: 'Kendaraan Buruk' },
          { title: 'Kasih bintang satu' },
          { title: 'Mengemudi ugal-ugalan' },
        ],
      },
    ],
  }

  // console.log(data)
  yield put(RatingAction.fetchRatingSuccess(data))
}
