import axios from 'axios'

const baseUrl = 'https://disease.sh/v3/covid-19'

export const fetchData = async (country) => {
   let url

   if (country !== 'global') {
      url = `${baseUrl}/countries/${country}`
   } else {      
      url = `${baseUrl}/all`
   }

   return await axios.get(url)
}

export const fetchDailyData = async () => {
   return axios.get(`${baseUrl}/historical/all?lastdays=all`)   
}

export const fetchCountries = async() => {     
   return await axios.get(`${baseUrl}/countries`)   
}
