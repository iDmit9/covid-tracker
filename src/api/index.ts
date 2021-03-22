import axios from 'axios'

const baseUrl = 'https://disease.sh/v3/covid-19'

export type MainDataType = {
   cases: number
   recovered: number
   deaths: number
   updated: number
}

export type CountryType = {
   country: string
   countryInfo: {
      lat: number
      long: number
      flag: string //link to flag
   }
   cases: number
}

export type DailyDataType = {
   cases: { [date: string]: number }
   recovered: { [date: string]: number }
   deaths: { [date: string]: number }
}

export const fetchData = (country: string) => {
   let url

   if (country !== 'global') {
      url = `${baseUrl}/countries/${country}`
   } else {
      url = `${baseUrl}/all`
   }

   return axios.get<MainDataType>(url)
}

export const fetchDailyData = async () => {
   return axios.get<DailyDataType>(`${baseUrl}/historical/all?lastdays=all`)   
}

export const fetchCountries =  () => {   
   return axios.get<Array<CountryType>>(`${baseUrl}/countries`) 
}
