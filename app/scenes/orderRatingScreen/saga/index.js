import { call, put } from 'redux-saga/effects'
import RatingAction from '../store/actions'
import { fetchRatingData } from 'services/profileService'

export function* fetchRatingInfo(payload) {
  //console.log('Get rating information')

  var infoSopir = []
  var infoUnit = []

  const json = yield call(fetchRatingData)
  console.log(json)
  if (json) {
    if (json.Error) {
    } else {
      if (json.data) {
        for (var i = 0; i < json.data.Data[0].ms_star.length; i++) {
          console.log(json.data.Data[0].ms_star[i].Description)
          var generalInfo = json.data.Data[0].ms_star[i].Description
          var generalLabel = json.data.Data[0].ms_star[i].ms_question.QuestionDesc
          var detailInfo = []
          var rating = json.data.Data[0].ms_star[i].ValueStar
          for (var j = 0; j < json.data.Data[0].ms_star[i].ms_stardetail.length; j++) {
            var obj = { title: json.data.Data[0].ms_star[i].ms_stardetail[j].Description }
            detailInfo.push(obj)
          }

          infoSopir.push({
            generalInfo,
            generalLabel,
            detailInfo,
            rating,
          })
        }

        for (var i = 0; i < json.data.Data[1].ms_star.length; i++) {
          var generalInfo = json.data.Data[1].ms_star[i].Description
          var generalLabel = json.data.Data[1].ms_star[i].ms_question.QuestionDesc
          var detailInfo = []
          var rating = json.data.Data[1].ms_star[i].ValueStar
          for (var j = 0; j < json.data.Data[1].ms_star[i].ms_stardetail.length; j++) {
            var obj = { title: json.data.Data[1].ms_star[i].ms_stardetail[j].Description }
            detailInfo.push(obj)
          }

          infoUnit.push({
            generalInfo,
            generalLabel,
            detailInfo,
            rating,
          })
        }
      }
    }
  } else {
  }

  console.log(infoSopir)
  console.log(infoUnit)

  const data = {
    sopir: infoSopir,
    kendaraan: infoUnit,
  }

  // console.log(data)
  yield put(RatingAction.fetchRatingSuccess(data))
}
