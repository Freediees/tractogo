const round = (number, firstDecimal) => {
  const numberString = '' + number
  const dataString = numberString.split('.')
  if (dataString.length > 1) {
    if (parseInt(dataString[1]) >= firstDecimal) {
      return Math.ceil(number)
    } else {
      return Math.floor(number)
    }
  } else {
    return number
  }
}

export { round }
