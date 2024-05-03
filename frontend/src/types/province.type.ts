export interface Province {
  province_id: string
  province_name: string
  province_type: string
}

export interface ProvinceResults {
  results: Pick<Province, 'province_id' | 'province_name' | 'province_type'>
}

export interface District {
  district_id: string
  district_name: string
}

export interface DistrictResults {
  results: Pick<District, 'district_id' | 'district_name'>
}

export interface Ward {
  ward_id: string
  ward_name: string
}

export interface WardResults {
  results: Pick<Ward, 'ward_id' | 'ward_name'>
}

export interface ProvinceState {
  provinces: Province | []
  districts: District | []
  wards: Ward | []
  status: string
}
