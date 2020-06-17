const getSortItems = () => {
  const items = [
    {
      value: 0,
      label: 'Harga Terendah',
    },
    {
      value: 1,
      label: 'Harga Tertinggi',
    },
    {
      value: 2,
      label: 'Kapasitas Penumpang Terkecil',
    },
    {
      value: 3,
      label: 'Kapasitas Penumpang Terbesar',
    },
  ]
  return items
}

const sortStock = (data, val) => {
  if (val === 0) {
    return data.sort((a, b) => {
      const keyA = a.discountedPrice || a.priceAmount
      const keyB = b.discountedPrice || b.priceAmount
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })
  } else if (val === 1) {
    return data.sort((a, b) => {
      const keyA = a.discountedPrice || a.priceAmount
      const keyB = b.discountedPrice || b.priceAmount
      if (keyA > keyB) return -1
      if (keyA < keyB) return 1
      return 0
    })
  } else if (val === 2) {
    return data.sort((a, b) => {
      const keyA = a.seatAmount || 0
      const keyB = b.seatAmount || 0
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })
  } else if (val === 3) {
    return data.sort((a, b) => {
      const keyA = a.seatAmount || 0
      const keyB = b.seatAmount || 0
      if (keyA > keyB) return -1
      if (keyA < keyB) return 1
      return 0
    })
  }
}

export { getSortItems, sortStock }
