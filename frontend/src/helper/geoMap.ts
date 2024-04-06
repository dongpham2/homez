const DATA_COUNTRY = require('~/data/VN.json')

export const getAllProvinces = () => {
  return DATA_COUNTRY.province
}

export const getAllDistricts = (id_district: number) => {
  return DATA_COUNTRY.district.filter((district: any) => district.idProvince === id_district)
}

export const getAllCommunes = (id_district: number) => {
  return DATA_COUNTRY.commune.filter((commune: any) => commune.idDistrict === id_district)
}

export const getProvince = (id_province: number) => {
  return DATA_COUNTRY.province.find((item: any) => item.idProvince === id_province)?.name || ''
}

export const getDistrict = (id_district: number) => {
  return DATA_COUNTRY.district.find((item: any) => item.idDistrict === id_district)?.name || ''
}
export const getCommune = (id_commune: number) => {
  return DATA_COUNTRY.commune.find((item: any) => item.idCommune === id_commune)?.name || ''
}