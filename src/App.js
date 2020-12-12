import React, { useEffect, useState } from 'react'

import { Cards, Chart, CountryPicker, Map } from './components'
import styles from './App.module.css'
import { fetchData, fetchCountries } from './api'

import coronaImage from './images/image.png'

import { makeStyles } from '@material-ui/core/styles'
import 'leaflet/dist/leaflet.css'

const useStyles = makeStyles((theme) => ({
  error: {
    ...theme.typography.button,
    padding: theme.spacing(1),
    textAlign: "center"
  },
}));

const App = () => {
  const classes = useStyles();

  const [data, setData] = useState({}) // data of worldwide or country info
  const [country, setCountry] = useState('global'); //country name
  const [countries, setCountries] = useState([]) //array of full countries data
  const [mapCenter, setMapCenter] = useState([30, 15]);
  const [mapZoom, setMapZoom] = useState(2);
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    (async function () {
      const fetchedData = await fetchData('global')

      if (!fetchedData[0]) {
        setIsError(true)
        setErrorMessage(fetchedData[1])
      } else {
        setData(fetchedData[1])       
      }
    })()
  }, [])
  
  useEffect(() => {
    const fetchAPI = async () => {
       const fetchedCountries = await fetchCountries()
       setCountries(fetchedCountries)
    }

    fetchAPI()
  }, [])

  const handleCountryChange = async (selectedCountry) => {
    const fetchedData = await fetchData(selectedCountry)
    
    if (!fetchedData[0]) {
      setIsError(true)
      setErrorMessage(fetchedData[1])
    } else {
      setData(fetchedData[1])
      setCountry(selectedCountry)      
    }

    console.log('selectedCountry',selectedCountry)
    if (selectedCountry === 'global') {
      setMapCenter([30, 15])
      setMapZoom(2)
    } else {
      const foundCountry = countries.find(country => country.country === selectedCountry)
      setMapCenter([foundCountry.countryInfo.lat, foundCountry.countryInfo.long])
      setMapZoom(4)
    }
  }

  if (isError) {
    return (
      <div className={classes.error}>{errorMessage}</div>
    )
  } else {
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt={"COVID-19"} />
        <Cards data={data} />
        <CountryPicker countries={countries} handleCountryChange={handleCountryChange} />
        <Chart data={data} country={country} />
        <Map
          countries={countries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
    )
  }
}

export default App
