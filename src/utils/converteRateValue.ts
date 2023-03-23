export const CONVERTE_RATE_VALUE = (value: number) => {
  const valueFloor = Math.round(value)
  const averangeRate = valueFloor < 5 ? valueFloor : valueFloor / 2
  return Math.round(averangeRate)
}

export const DATA_STARS = (numb: number) => {
  const valueFloor = Math.round(numb)
  const averangeRate = valueFloor < 5 ? valueFloor : valueFloor / 2
  const dataStar = [...Array(Math.round(averangeRate))]
  return dataStar
}
