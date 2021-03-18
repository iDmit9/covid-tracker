import axios from 'axios'

const baseUrl = 'https://disease.sh/v3/covid-19'

type MainDataType = {
   cases: number
   recovered: number
   deaths: number
   updated: number
}

type CountryType = {
   country: string
}

//fields "cases", "recovered" and "deaths" consists of unknown number of enumerable properties of an object
//I did not figure out how to describe hundreds fields with unknown names better than "any"
type DailyDataType = {
   cases: any
   recovered: any
   deaths: any
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
