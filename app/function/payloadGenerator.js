import { getUserProfileObject, pad } from 'function'
import Moment from 'moment'

const generateAddCartPayload = async (payload) => {
  const userProfile = await getUserProfileObject()
  const startDateArr = []
  const endDateArr = []
  const pickUpLocationsArr = []
  const dropLocationsArr = []
  const reservationsExtrasArr = []
  let pastDay = false
  if (parseInt(payload.hour) + parseInt(payload.duration) > 24) {
    pastDay = true
  }
  const endHour = pad(
    parseInt(payload.hour) + parseInt(payload.duration) >= 24
      ? parseInt(payload.hour) + parseInt(payload.duration) - 24
      : parseInt(payload.hour) + parseInt(payload.duration),
    2
  )
  if (payload.pickUpLocations) {
    payload.pickUpLocations.forEach((v, i) => {
      const newData = {
        CityId: payload.city.item.CityId,
        Long: v.location.lon,
        Lat: v.location.lat,
        Alamat: v.location.name,
        Time: `${Moment(v.date).format('YYYY-MM-DD')} ${v.hour}:${v.minute}:00`,
        Notes: v.notes,
        PriceExpedition: v.priceExpedition || [],
      }
      pickUpLocationsArr.push(newData)
    })
  }
  if (payload.dropLocations) {
    payload.dropLocations.forEach((v, i) => {
      let passDate = v.date
      let tempDate = v.date
      let pastDayDrop = false
      const endHourDrop = pad(
        parseInt(v.hour) + parseInt(payload.duration) >= 24
          ? parseInt(v.hour) + parseInt(payload.duration) - 24
          : parseInt(v.hour) + parseInt(payload.duration),
        2
      )
      if (parseInt(v.hour) + parseInt(payload.duration) > 24) {
        pastDayDrop = true
      }
      if (pastDayDrop) {
        passDate = new Date(tempDate.setDate(tempDate.getDate() + 1))
      }
      const newData = {
        CityId: payload.city.item.CityId,
        Long: v.location.lon,
        Lat: v.location.lat,
        Alamat: v.location.name,
        Time: `${Moment(pastDay ? passDate : v.date).format('YYYY-MM-DD')} ${endHourDrop}:${
          v.minute
        }:00`,
        Notes: v.notes,
        PriceExpedition: v.priceExpedition || [],
      }
      dropLocationsArr.push(newData)
    })
  }

  if (payload.reservationExtras) {
    payload.reservationExtras.forEach((v, i) => {
      console.log(v)
      if (v.item && v.count !== 0) {
        const newData = {
          ExtrasId: v.item.ExtrasId,
          Availability: v.item.Availability,
          name: v.name,
          price: v.value,
          pricePer: v.unit,
          amounts: v.count,
          total: v.total,
          ValueType: v.type,
          StockType: v.item.extras.StockType,
          id: parseInt(v.item.ExtrasId),
        }
        reservationsExtrasArr.push(newData)
      }
    })
  }

  let tempEndDate = payload.endDate
  let tempStartDate = payload.startDate
  let tempStartDate1 = new Date(payload.startDate)
  let tempEndDate1 = new Date(payload.endDate)

  if (parseInt(payload.duration) <= 12) {
    for (
      tempStartDate;
      tempStartDate <= tempEndDate;
      tempStartDate.setDate(tempStartDate.getDate() + 1)
    ) {
      const tempDate = new Date(tempStartDate)
      startDateArr.push(
        `${Moment(tempStartDate).format('YYYY-MM-DD')} ${payload.hour}:${payload.minute}:00`
      )
      if (pastDay) {
        const passDate = new Date(tempDate.setDate(payload.endDate.getDate() + 1))
        endDateArr.push(`${Moment(passDate).format('YYYY-MM-DD')} ${endHour}:${payload.minute}:00`)
      } else {
        endDateArr.push(`${Moment(tempDate).format('YYYY-MM-DD')} ${endHour}:${payload.minute}:00`)
      }
    }
  } else {
    startDateArr.push(
      `${Moment(tempStartDate1).format('YYYY-MM-DD')} ${payload.hour}:${payload.minute}:00`
    )
    if (pastDay) {
      const passDate = new Date(tempEndDate1.setDate(tempEndDate1.getDate() + 1))
      endDateArr.push(`${Moment(passDate).format('YYYY-MM-DD')} ${endHour}:${payload.minute}:00`)
    } else {
      endDateArr.push(
        `${Moment(tempEndDate1).format('YYYY-MM-DD')} ${endHour}:${payload.minute}:00`
      )
    }
  }

  if (payload.reservationPromo) {
    const tempPromo = []
    payload.reservationPromo.forEach((v) => {
      const newV = {
        PromoCode: v.code,
        CategoryPromoId: v.category_id,
        CategoryPromoName: v.category_name,
        TypeValue: v.type_value,
        Value: v.value,
        value: v.value,
      }
      tempPromo.push(newV)
    })
    payload.reservationPromo = tempPromo
  }

  const newPayload = {
    CompanyId: '0100',
    CustomerName: `${userProfile.FirstName} ${userProfile.LastName}`,
    BusinessUnitId: payload.item.item.businessUnitId,
    BranchId: payload.item.item.branchId,
    ServiceTypeId: payload.item.item.unitContractList[0].serviceTypeId,
    ServiceTypeName: `${payload.item.item.unitContractList[0].serviceTypeSAPName} - ${
      payload.item.item.unitContractList[0].serviceTypeId
    }`,
    CreatedBy: userProfile.Id,
    PIC: userProfile.Id,
    PICName: `${userProfile.FirstName} ${userProfile.LastName}`,
    PICPhone: userProfile.NoHandphone,
    NotesReservation: 'null',
    TotalPrice: payload.SubTotal,
    DeviceSource: 0,
    CartDetail: [
      {
        UserId: userProfile.Id,
        UnitTypeId: payload.item.item.vehicleTypeId,
        UnitTypeName: payload.item.item.vehicleTypeDesc,
        CityId: payload.city.item.CityId,
        CityName: payload.city.item.MsCityName,
        PoolId: payload.city.item.PoolId,
        BranchId: payload.item.item.branchId,
        StartDate: startDateArr,
        EndDate: endDateArr,
        Duration: payload.duration,
        QtyUnit: 1,
        QtyPassenger: 1,
        IsStay: false,
        OutTown: false,
        IsPlanned: false,
        IsExpedition: false,
        IsWithDriver: payload.isWithDriver,
        TotalLuggage: payload.item.suitcaseAmount || 0,
        TotalSeat: payload.item.seatAmount || 0,
        VehicleImage: payload.item.item.vehicleImage,
        Fuel: '01',
        TollAndParking: '01',
        DriverOrRider: '01',
        IsPaymentUpfront: true,
        ContractId: payload.item.item.unitContractList[0].contractId,
        ContractItemId: payload.item.item.unitContractList[0].contractItemId,
        ProductId: payload.item.item.unitContractList[0].serviceTypeId,
        MaterialId: payload.item.item.unitContractList[0].materialId,
        IsTransmissionManual: true,
        MsProductId: payload.item.priceInformation.MsProductId,
        MsProductServiceId: payload.item.priceInformation.ProductServiceId,
        ZoneId: null,
        TotalDistance: payload.item.totalDistance || null,
        PickupLocation: pickUpLocationsArr,
        DropLocation: dropLocationsArr.length > 0 ? dropLocationsArr : pickUpLocationsArr,
        Price: parseInt(payload.item.priceAmount),
        PriceExtras: payload.PriceExtras,
        PriceExpedition: payload.PriceExpedition,
        PriceDiscount: payload.PriceDiscount,
        SubTotal: payload.SubTotal,
        Passengers: [
          {
            Name: `${userProfile.FirstName} ${userProfile.LastName}`,
            PhoneNumber: payload.additionalPersonPhone || userProfile.NoHandphone,
            Email: userProfile.EmailPersonal,
            IDCardNumber: userProfile.NoKTP || '2171112612869001',
            NPWPNumber: '',
            LicenseNumber: userProfile.NoSIM,
            PassportNumber: '',
            Address: userProfile.Address,
            IsPIC: !payload.additionalPerson,
            ImageKTP: userProfile.ImageKTP || 'http://omni-service-profile',
            ImageSIM: userProfile.ImageSIM || 'http://omni-service-profile',
            IsForeigner: false,
          },
        ],
        ReservationExtras: reservationsExtrasArr,
        ReservationPromo: payload.reservationPromo,
        FlightDetail: payload.flightDetail || [],
      },
    ],
  }
  if (newPayload.CartDetail.additionalPerson) {
    newPayload.CartDetail.Passengers.push({
      Name: payload.additionalPerson,
      PhoneNumber: payload.additionalPersonPhone,
      IsPIC: true,
      Email: '',
      IDCardNumber: '',
      NPWPNumber: '',
      LicenseNumber: '',
      PassportNumber: '',
      Address: userProfile.Address,
      ImageKTP: '',
      ImageSIM: '',
      IsForeigner: false,
    })
  }
  return newPayload
}

const generateCheckoutPayload = async (payload) => {
  const userProfile = await getUserProfileObject()
  const startDateArr = []
  const endDateArr = []
  const pickUpLocationsArr = []
  const dropLocationsArr = []
  const reservationsExtrasArr = []
  let pastDay = false
  if (parseInt(payload.hour) + parseInt(payload.duration) > 24) {
    pastDay = true
  }
  const endHour = pad(
    parseInt(payload.hour) + parseInt(payload.duration) >= 24
      ? parseInt(payload.hour) + parseInt(payload.duration) - 24
      : parseInt(payload.hour) + parseInt(payload.duration),
    2
  )
  if (payload.pickUpLocations) {
    payload.pickUpLocations.forEach((v, i) => {
      const newData = {
        CityId: payload.city.item.CityId,
        Long: v.location.lon,
        Lat: v.location.lat,
        Alamat: v.location.name,
        Time: `${Moment(v.date).format('YYYY-MM-DD')} ${v.hour}:${v.minute}:00`,
        Notes: v.notes,
        PriceExpedition: v.priceExpedition || [],
      }
      pickUpLocationsArr.push(newData)
    })
  }
  if (payload.dropLocations) {
    payload.dropLocations.forEach((v, i) => {
      let passDate = v.date
      let tempDate = v.date
      let pastDayDrop = false
      const endHourDrop = pad(
        parseInt(v.hour) + parseInt(payload.duration) >= 24
          ? parseInt(v.hour) + parseInt(payload.duration) - 24
          : parseInt(v.hour) + parseInt(payload.duration),
        2
      )
      if (parseInt(v.hour) + parseInt(payload.duration) > 24) {
        pastDayDrop = true
      }
      if (pastDayDrop) {
        passDate = new Date(tempDate.setDate(tempDate.getDate() + 1))
      }
      const newData = {
        CityId: payload.city.item.CityId,
        Long: v.location.lon,
        Lat: v.location.lat,
        Alamat: v.location.name,
        Time: `${Moment(pastDay ? passDate : v.date).format('YYYY-MM-DD')} ${endHourDrop}:${
          v.minute
        }:00`,
        Notes: v.notes,
        PriceExpedition: v.priceExpedition || [],
      }
      dropLocationsArr.push(newData)
    })
  }

  if (payload.reservationExtras) {
    payload.reservationExtras.forEach((v, i) => {
      console.log(v)
      if (v.item && v.count !== 0) {
        const newData = {
          ExtrasId: v.item.ExtrasId,
          Availability: v.item.Availability,
          name: v.name,
          price: v.value,
          pricePer: v.unit,
          amounts: v.count,
          total: v.total,
          ValueType: v.type,
          StockType: v.item.extras.StockType,
          id: parseInt(v.item.ExtrasId),
        }
        reservationsExtrasArr.push(newData)
      }
    })
  }

  let tempEndDate = payload.endDate
  let tempStartDate = payload.startDate
  let tempStartDate1 = new Date(payload.startDate)
  let tempEndDate1 = new Date(payload.endDate)

  if (parseInt(payload.duration) <= 12) {
    for (
      tempStartDate;
      tempStartDate <= tempEndDate;
      tempStartDate.setDate(tempStartDate.getDate() + 1)
    ) {
      const tempDate = new Date(tempStartDate)
      startDateArr.push(
        `${Moment(tempStartDate).format('YYYY-MM-DD')} ${payload.hour}:${payload.minute}:00`
      )
      if (pastDay) {
        const passDate = new Date(tempDate.setDate(tempDate.getDate() + 1))
        endDateArr.push(`${Moment(passDate).format('YYYY-MM-DD')} ${endHour}:${payload.minute}:00`)
      } else {
        endDateArr.push(`${Moment(tempDate).format('YYYY-MM-DD')} ${endHour}:${payload.minute}:00`)
      }
    }
  } else {
    startDateArr.push(
      `${Moment(tempStartDate1).format('YYYY-MM-DD')} ${payload.hour}:${payload.minute}:00`
    )
    if (pastDay) {
      const passDate = new Date(tempEndDate1.setDate(tempEndDate1.getDate() + 1))
      endDateArr.push(`${Moment(passDate).format('YYYY-MM-DD')} ${endHour}:${payload.minute}:00`)
    } else {
      endDateArr.push(
        `${Moment(tempEndDate1).format('YYYY-MM-DD')} ${endHour}:${payload.minute}:00`
      )
    }
  }

  if (payload.reservationPromo) {
    const tempPromo = []
    payload.reservationPromo.forEach((v) => {
      const newV = {
        PromoCode: v.code,
        CategoryPromoId: v.category_id,
        CategoryPromoName: v.category_name,
        TypeValue: v.type_value,
        Value: v.value,
        value: v.value,
      }
      tempPromo.push(newV)
    })
    payload.reservationPromo = tempPromo
  }

  const newPayload = {
    CompanyId: '0100',
    CustomerName: `${userProfile.FirstName} ${userProfile.LastName}`,
    BusinessUnitId: payload.item.item.businessUnitId,
    BranchId: payload.item.item.branchId,
    ServiceTypeId: payload.item.item.unitContractList[0].serviceTypeId,
    ServiceTypeName: `${payload.item.item.unitContractList[0].serviceTypeSAPName} - ${
      payload.item.item.unitContractList[0].serviceTypeId
    }`,
    CreatedBy: userProfile.Id,
    PIC: userProfile.Id,
    PICName: `${userProfile.FirstName} ${userProfile.LastName}`,
    PICPhone: userProfile.NoHandphone,
    NotesReservation: 'null',
    TotalPrice: payload.SubTotal,
    ReservationDetail: [
      {
        UserId: userProfile.Id,
        UnitTypeId: payload.item.item.vehicleTypeId,
        UnitTypeName: payload.item.item.vehicleTypeDesc,
        CityId: payload.city.item.CityId,
        CityName: payload.city.item.MsCityName,
        PoolId: payload.city.item.PoolId,
        BranchId: payload.item.item.branchId,
        StartDate: startDateArr,
        EndDate: endDateArr,
        Duration: payload.duration,
        QtyUnit: 1,
        QtyPassenger: 1,
        IsStay: false,
        OutTown: false,
        IsPlanned: false,
        IsExpedition: false,
        IsWithDriver: payload.isWithDriver,
        TotalLuggage: payload.item.suitcaseAmount || 0,
        TotalSeat: payload.item.seatAmount || 0,
        VehicleImage: payload.item.item.vehicleImage,
        Fuel: '01',
        TollAndParking: '01',
        DriverOrRider: '01',
        IsPaymentUpfront: true,
        ContractId: payload.item.item.unitContractList[0].contractId,
        ContractItemId: payload.item.item.unitContractList[0].contractItemId,
        ProductId: payload.item.item.unitContractList[0].serviceTypeId,
        MaterialId: payload.item.item.unitContractList[0].materialId,
        IsTransmissionManual: true,
        MsProductId: payload.item.priceInformation.MsProductId,
        MsProductServiceId: payload.item.priceInformation.ProductServiceId,
        ZoneId: null,
        TotalDistance: payload.item.totalDistance || null,
        PickupLocation: pickUpLocationsArr,
        DropLocation: dropLocationsArr.length > 0 ? dropLocationsArr : pickUpLocationsArr,
        Price: parseInt(payload.item.priceAmount),
        PriceExtras: payload.PriceExtras,
        PriceExpedition: payload.PriceExpedition,
        PriceDiscount: payload.PriceDiscount,
        SubTotal: payload.SubTotal,
        Passengers: [
          {
            Name: `${userProfile.FirstName} ${userProfile.LastName}`,
            PhoneNumber: payload.additionalPersonPhone || userProfile.NoHandphone,
            Email: userProfile.EmailPersonal,
            IDCardNumber: userProfile.NoKTP || '2171112612869001',
            NPWPNumber: '',
            LicenseNumber: userProfile.NoSIM,
            PassportNumber: '',
            Address: userProfile.Address,
            IsPIC: !payload.additionalPerson,
            ImageKTP: userProfile.ImageKTP || 'http://omni-service-profile',
            ImageSIM: userProfile.ImageSIM || 'http://omni-service-profile',
            IsForeigner: false,
          },
        ],
        ReservationExtras: reservationsExtrasArr,
        ReservationPromo: payload.reservationPromo,
        FlightDetail: payload.flightDetail || [],
      },
    ],
  }
  if (newPayload.ReservationDetail.additionalPerson) {
    newPayload.ReservationDetail.Passengers.push({
      Name: payload.additionalPerson,
      PhoneNumber: payload.additionalPersonPhone,
      IsPIC: true,
      Email: '',
      IDCardNumber: '',
      NPWPNumber: '',
      LicenseNumber: '',
      PassportNumber: '',
      Address: userProfile.Address,
      ImageKTP: '',
      ImageSIM: '',
      IsForeigner: false,
    })
  }
  return newPayload
}

const generateAirportCheckoutPayload = async (payload) => {
  const userProfile = await getUserProfileObject()

  if (payload.reservationPromo) {
    const tempPromo = []
    payload.reservationPromo.forEach((v) => {
      const newV = {
        PromoCode: v.code,
        CategoryPromoId: v.category_id,
        CategoryPromoName: v.category_name,
        TypeValue: v.type_value,
        Value: v.value,
        value: v.value,
      }
      tempPromo.push(newV)
    })
    payload.reservationPromo = tempPromo
  }

  const newPayload = {
    CompanyId: '0100',
    CustomerName: `${userProfile.FirstName} ${userProfile.LastName}`,
    BusinessUnitId: payload.item.item.businessUnitId,
    BranchId: payload.item.item.branchId,
    ServiceTypeId: payload.item.item.unitContractList[0].serviceTypeId,
    ServiceTypeName: `${payload.item.item.unitContractList[0].serviceTypeSAPName} - ${
      payload.item.item.unitContractList[0].serviceTypeId
    }`,
    CreatedBy: userProfile.Id,
    PIC: userProfile.Id,
    PICName: `${userProfile.FirstName} ${userProfile.LastName}`,
    PICPhone: userProfile.NoHandphone,
    NotesReservation: null,
    TotalPrice: parseInt(payload.subTotal),
    ReservationDetail: [
      {
        UserId: userProfile.Id,
        UnitTypeId: payload.item.item.vehicleTypeId,
        UnitTypeName: payload.item.item.vehicleTypeDesc,
        CityId: payload.reservationDetails.city.CityID,
        MsAirportCode: payload.reservationDetails.airport.Code,
        CityName: payload.reservationDetails.city.CityName,
        BranchId: payload.item.item.branchId,
        StartDate: [
          Moment(Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate())
            .local()
            .format('YYYY-MM-DD HH:mm:ss'),
        ],
        EndDate: [
          Moment(Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate())
            .local()
            .format('YYYY-MM-DD HH:mm:ss'),
        ],
        Duration: payload.reservationDetails.zone.KM,
        QtyUnit: 1,
        QtyPassenger: 1,
        IsWithDriver: true,
        IsExpedition: false,
        IsPaymentUpfront: true,
        ContractId: payload.item.item.unitContractList[0].contractId,
        ContractItemId: payload.item.item.unitContractList[0].contractItemId,
        ProductId: 'PD-001',
        MaterialId: payload.item.item.unitContractList[0].materialId,
        LicensePlate: '',
        TotalLuggage: payload.item.suitcaseAmount || 0,
        TotalSeat: payload.item.seatAmount || 0,
        VehicleImage: payload.item.item.vehicleImage,
        Price: parseInt(payload.subTotal),
        IsTransmissionManual: null,
        PriceExtras: 0,
        MsProductId: 'PRD0007',
        MsProductServiceId: 'PSV0003',
        ZoneId: payload.reservationDetails.zone.MsZoneId,
        TotalDistance: payload.reservationDetails.zone.KM,
        PickupLocation: [
          {
            CityId: payload.reservationDetails.city.CityID,
            Long: payload.isFromAirport
              ? payload.reservationDetails.airport.location.lng
              : payload.reservationDetails.city.lon,
            Lat: payload.isFromAirport
              ? payload.reservationDetails.airport.location.lat
              : payload.reservationDetails.city.lat,
            Alamat: payload.isFromAirport
              ? payload.reservationDetails.airport.Airport
              : payload.reservationDetails.city.address,
            Time: Moment(Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate())
              .local()
              .format('YYYY-MM-DD HH:mm:ss'),
            Notes: payload.isFromAirport
              ? `Gate Number : ${payload.gateNumber}, Flight Number : ${payload.flightNumber}`
              : payload.fromAddressNotes,
          },
        ],
        DropLocation: [
          {
            CityId: payload.reservationDetails.city.CityID,
            Long: payload.isFromAirport
              ? payload.reservationDetails.airport.location.lng
              : payload.reservationDetails.city.lon,
            Lat: payload.isFromAirport
              ? payload.reservationDetails.airport.location.lat
              : payload.reservationDetails.city.lat,
            Alamat: payload.isFromAirport
              ? payload.reservationDetails.airport.Airport
              : payload.reservationDetails.city.address,
            Time: Moment(Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate())
              .local()
              .format('YYYY-MM-DD HH:mm:ss'),
            Notes: null,
          },
        ],
        Passengers: [
          {
            Name: `${userProfile.FirstName} ${userProfile.LastName}`,
            PhoneNumber: payload.additionalPersonPhone || userProfile.NoHandphone,
            Email: userProfile.EmailPersonal,
            IDCardNumber: userProfile.NoKTP || '2171112612869001',
            NPWPNumber: '',
            LicenseNumber: userProfile.NoSIM,
            PassportNumber: '',
            Address: userProfile.Address,
            IsPIC: !payload.additionalPerson,
            ImageKTP: userProfile.ImageKTP || 'http://omni-service-profile',
            ImageSIM: userProfile.ImageSIM || 'http://omni-service-profile',
            IsForeigner: false,
          },
        ],
        ReservationExtras: [],
        ReservationPromo: payload.reservationPromo,
        FlightDetail: [
          {
            Address: payload.gateNumber,
            AirlineCode: payload.reservationDetails.airport.Code,
            FlightNumber: payload.flightNumber,
            PickUpHour: Moment(
              Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate()
            )
              .local()
              .format('HH:mm'),
            PickUpLocation: '',
          },
        ],
      },
    ],
  }
  if (newPayload.ReservationDetail.additionalPerson) {
    newPayload.ReservationDetail.Passengers.push({
      Name: payload.additionalPerson,
      PhoneNumber: payload.additionalPersonPhone,
      IsPIC: true,
      Email: '',
      IDCardNumber: '',
      NPWPNumber: '',
      LicenseNumber: '',
      PassportNumber: '',
      Address: userProfile.Address,
      ImageKTP: '',
      ImageSIM: '',
      IsForeigner: false,
    })
  }
  return newPayload
}

const generateAirportAddCartPayload = async (payload) => {
  const userProfile = await getUserProfileObject()

  if (payload.reservationPromo) {
    const tempPromo = []
    payload.reservationPromo.forEach((v) => {
      const newV = {
        PromoCode: v.code,
        CategoryPromoId: v.category_id,
        CategoryPromoName: v.category_name,
        TypeValue: v.type_value,
        Value: v.value,
        value: v.value,
      }
      tempPromo.push(newV)
    })
    payload.reservationPromo = tempPromo
  }

  const newPayload = {
    CompanyId: '0100',
    CustomerName: `${userProfile.FirstName} ${userProfile.LastName}`,
    BusinessUnitId: payload.item.item.businessUnitId,
    BranchId: payload.item.item.branchId,
    ServiceTypeId: payload.item.item.unitContractList[0].serviceTypeId,
    ServiceTypeName: `${payload.item.item.unitContractList[0].serviceTypeSAPName} - ${
      payload.item.item.unitContractList[0].serviceTypeId
    }`,
    CreatedBy: userProfile.Id,
    PIC: userProfile.Id,
    PICName: `${userProfile.FirstName} ${userProfile.LastName}`,
    PICPhone: userProfile.NoHandphone,
    NotesReservation: null,
    TotalPrice: parseInt(payload.subTotal),
    DeviceSource: 0,
    CartDetail: [
      {
        UserId: userProfile.Id,
        UnitTypeId: payload.item.item.vehicleTypeId,
        UnitTypeName: payload.item.item.vehicleTypeDesc,
        CityId: payload.reservationDetails.city.CityID,
        MsAirportCode: payload.reservationDetails.airport.Code,
        CityName: payload.reservationDetails.city.CityName,
        BranchId: payload.item.item.branchId,
        StartDate: [
          Moment(Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate())
            .local()
            .format('YYYY-MM-DD HH:mm:ss'),
        ],
        EndDate: [
          Moment(Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate())
            .local()
            .format('YYYY-MM-DD HH:mm:ss'),
        ],
        Duration: payload.reservationDetails.zone.KM,
        QtyUnit: 1,
        QtyPassenger: 1,
        IsWithDriver: true,
        IsExpedition: false,
        IsPaymentUpfront: true,
        ContractId: payload.item.item.unitContractList[0].contractId,
        ContractItemId: payload.item.item.unitContractList[0].contractItemId,
        ProductId: 'PD-001',
        MaterialId: payload.item.item.unitContractList[0].materialId,
        TotalLuggage: payload.item.suitcaseAmount || 0,
        TotalSeat: payload.item.seatAmount || 0,
        VehicleImage: payload.item.item.vehicleImage,
        LicensePlate: '',
        Price: parseInt(payload.subTotal),
        IsTransmissionManual: null,
        PriceExtras: 0,
        MsProductId: 'PRD0007',
        MsProductServiceId: 'PSV0003',
        ZoneId: payload.reservationDetails.zone.MsZoneId,
        TotalDistance: payload.reservationDetails.zone.KM,
        PickupLocation: [
          {
            CityId: payload.reservationDetails.city.CityID,
            Long: payload.isFromAirport
              ? payload.reservationDetails.airport.location.lng
              : payload.reservationDetails.city.lon,
            Lat: payload.isFromAirport
              ? payload.reservationDetails.airport.location.lat
              : payload.reservationDetails.city.lat,
            Alamat: payload.isFromAirport
              ? payload.reservationDetails.airport.Airport
              : payload.reservationDetails.city.address,
            Time: Moment(Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate())
              .local()
              .format('YYYY-MM-DD HH:mm:ss'),
            Notes: payload.isFromAirport
              ? `Gate Number : ${payload.gateNumber}, Flight Number : ${payload.flightNumber}`
              : payload.fromAddressNotes,
          },
        ],
        DropLocation: [
          {
            CityId: payload.reservationDetails.city.CityID,
            Long: payload.isFromAirport
              ? payload.reservationDetails.airport.location.lng
              : payload.reservationDetails.city.lon,
            Lat: payload.isFromAirport
              ? payload.reservationDetails.airport.location.lat
              : payload.reservationDetails.city.lat,
            Alamat: payload.isFromAirport
              ? payload.reservationDetails.airport.Airport
              : payload.reservationDetails.city.address,
            Time: Moment(Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate())
              .local()
              .format('YYYY-MM-DD HH:mm:ss'),
            Notes: null,
          },
        ],
        Passengers: [
          {
            Name: `${userProfile.FirstName} ${userProfile.LastName}`,
            PhoneNumber: payload.additionalPersonPhone || userProfile.NoHandphone,
            Email: userProfile.EmailPersonal,
            IDCardNumber: userProfile.NoKTP || '2171112612869001',
            NPWPNumber: '',
            LicenseNumber: userProfile.NoSIM,
            PassportNumber: '',
            Address: userProfile.Address,
            IsPIC: !payload.additionalPerson,
            ImageKTP: userProfile.ImageKTP || 'http://omni-service-profile',
            ImageSIM: userProfile.ImageSIM || 'http://omni-service-profile',
            IsForeigner: false,
          },
        ],
        ReservationExtras: [],
        ReservationPromo: payload.reservationPromo,
        FlightDetail: [
          {
            Address: payload.gateNumber,
            AirlineCode: payload.reservationDetails.airport.Code,
            FlightNumber: payload.flightNumber,
            PickUpHour: Moment(
              Moment.utc(payload.reservationDetails.date.formatedSelectedDate).toDate()
            )
              .local()
              .format('HH:mm'),
            PickUpLocation: '',
          },
        ],
      },
    ],
  }
  if (newPayload.CartDetail.additionalPerson) {
    newPayload.CartDetail.Passengers.push({
      Name: payload.additionalPerson,
      PhoneNumber: payload.additionalPersonPhone,
      IsPIC: true,
      Email: '',
      IDCardNumber: '',
      NPWPNumber: '',
      LicenseNumber: '',
      PassportNumber: '',
      Address: userProfile.Address,
      ImageKTP: '',
      ImageSIM: '',
      IsForeigner: false,
    })
  }
  return newPayload
}

const generateSocialitePayload = async (payload) => {
  const data = {
    accessToken: 'RzfG7UyNnooJMwfz1vbFO0s60dYfoqMX',
    idToken: payload.idToken,
    idTokenPayload: {
      given_name: payload.givenName,
      family_name: payload.familyName,
      nickname: payload.name,
      name: payload.name,
      picture: payload.photo,
      gender: 'male',
      locale: 'id',
      updated_at: '2019-01-10T06:45:53.184Z',
      email: payload.email,
      email_verified: true,
      iss: 'https://ttg-development.au.auth0.com/',
      sub: 'google-oauth2|102391425567853629581',
      aud: 'gK3b9YSXa0TBuhZTVY_t-Dj7A3Hvq7o8',
      iat: 1547102753,
      exp: 1547138753,
      at_hash: 'OpuL0DPu6s1x2IgUiqDiIg',
      nonce: 'AAoacogXkYY.j64KQ9sCxv9PHdi9bID0',
    },
    appState: null,
    refreshToken: null,
    state: 'O0rBrPkzgQBJA08qoUF5ae-s-HODPBtK',
    expiresIn: 7200,
    tokenType: 'Bearer',
    scope: 'openid profile email',
  }
  return data
}

const generateRegisterPayload = async (payload) => {
  const data = {
    EmailPersonal: payload.EmailPersonal,
    NoHandphone: payload.NoHandphone,
    FirstName: payload.FirstName,
    LastName: payload.LastName,
    BirthDate: payload.BirthDate,
    Gender: payload.Gender,
  }
  return data
}

export {
  generateAddCartPayload,
  generateSocialitePayload,
  generateRegisterPayload,
  generateCheckoutPayload,
  generateAirportCheckoutPayload,
  generateAirportAddCartPayload,
}
