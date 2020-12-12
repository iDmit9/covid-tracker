import axios from 'axios'

const baseUrl = 'https://disease.sh/v3/covid-19'
// const oldUrl = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
   let url

   if (country !== 'global') {
      url = `${baseUrl}/countries/${country}`
   } else {      
      url = `${baseUrl}/all`
   }

   try {
      const { data: { cases, recovered, deaths, updated } } = await axios.get(url)
     
      return [true, { cases, recovered, deaths, updated }]
   } catch (error) {
      return [false, 'Can\'t fetch data']
   }
}

export const fetchDailyData = async () => {
   try {
      const { data } = await axios.get(`${baseUrl}/historical/all?lastdays=all`)
      
      return data
   } catch (error) {
      console.log('Can\'t fetch daily data')
   }
}

export const fetchCountries = async () => {   
   try { 
      const data  = await axios.get(`${baseUrl}/countries`)      
      const countries = data.data
      
      // return countries.map((country) => country.country)
      return countries // all data
   } catch (error) {
      console.log('Can\'t fetch countries')
   }
}
