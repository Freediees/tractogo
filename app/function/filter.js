const getChipItems = () => {
  return [
    {
      value: 0,
      label: 'All',
    },
    {
      value: 1,
      label: '4 Passengers',
    },
    {
      value: 2,
      label: '5-6 Passengers',
    },
    {
      value: 3,
      label: '> 6 Passengers',
    },
  ]
}

const filterStock = (data, filter) => {
  const newArr = data.filter((newData) => {
    console.log({ newData })
    console.log({ filter })
    if (
      (newData.discountedPrice >= filter.selectedMin || newData.priceAmount >= filter.selectedMin) &&
      (newData.discountedPrice <= filter.selectedMax || newData.priceAmount <= filter.selectedMax)
    ) {
      console.log('filter.selectedMin', filter.selectedMin)
      console.log('filter.selectedMax', filter.selectedMax)
      console.log('newData.discountedPrice', newData.discountedPrice)
      console.log('newData.priceAmount', newData.priceAmount)

      console.log(
        'newData.discountedPrice || newData.priceAmount >= filter.selectedMin',
        newData.discountedPrice || newData.priceAmount >= filter.selectedMin
      )
      console.log(
        'newData.discountedPrice || newData.priceAmount <= filter.selectedMax',
        newData.discountedPrice || newData.priceAmount <= filter.selectedMax
      )
      if (filter.selectedChipItem.value === 0) {
        return true
      } else if (filter.selectedChipItem.value === 1) {
        return newData.seatAmount <= 4
      } else if (filter.selectedChipItem.value === 2) {
        return newData.seatAmount >= 5 && newData.seatAmount <= 6
      } else if (filter.selectedChipItem.value === 3) {
        return newData.seatAmount > 6
      }
    }
  })
  console.log({ newArr })
  return newArr
}

export { getChipItems, filterStock }
