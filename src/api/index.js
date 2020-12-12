import axios from 'axios'

const baseUrl = 'https://disease.sh/v3/covid-19'
 const oldUrl = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
   // let changeableUrl = url
   let url

   if (country) {
      // changeableUrl = `${url}/countries/${country}`
      url = `${baseUrl}/countries/${country}`
   } else {      
      url = `${baseUrl}/all`
   }

   try {
      // const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl)
      const { data: { cases, recovered, deaths, updated } } = await axios.get(url)
      console.log('changeableUrl', url)
      console.log('data', { cases, recovered, deaths, updated })
      // return [true, { confirmed, recovered, deaths, lastUpdate }]
      return [true, { cases, recovered, deaths, updated }]
   } catch (error) {
      return [false, 'Can\'t fetch data']
   }
}

export const fetchDailyData = async () => {
   try {
      // const { data } = await axios.get(`${url}/daily`)
      const { data } = await axios.get(`${oldUrl}/daily`)

      const modifiedData = data.map((dailyData) => ({
         confirmed: dailyData.confirmed.total,
         deaths: dailyData.deaths.total,
         date: dailyData.reportDate
      }))

      return modifiedData
   } catch (error) {
      console.log('Can\'t fetch daily data')
   }
}

export const fetchCountries = async () => {
   try {
      const { data: { countries } } = await axios.get(`${oldUrl}/countries`)

      return countries.map((country) => country.name)
   } catch (error) {
      console.log('Can\'t fetch countries')
   }
}

export const fetchConfirmed = async () => {   
   try {      
      const { data } = await axios.get(`${oldUrl}/confirmed`)
      return data
      // return data.filter(country => country.provinceState === null)
      
   } catch (error) {
      console.log('Can\'t fetch countries')
   }
}