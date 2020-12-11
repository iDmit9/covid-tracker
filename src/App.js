import React, { useEffect, useState } from 'react'

import { Cards, Chart, CountryPicker, Map } from './components'
import styles from './App.module.css'
import { fetchData, fetchConfirmed } from './api'

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

  const [data, setData] = useState({})
  const [confirmed, setConfirmed] = useState([])
  const [maxConfirmed, setMaxConfirmed] = useState(0)
  const [country, setCountry] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    (async function () {
      const fetchedData = await fetchData()
      const fetchedConfirmed = await fetchConfirmed()

      if (!fetchedData[0]) {
        setIsError(true)
        setErrorMessage(fetchedData[1])
      } else {
        setData(fetchedData[1])
        setConfirmed(fetchedConfirmed) 
        let confirmedCount = fetchedConfirmed.sort((a, b) => a.confirmed > b.confirmed ? -1 : 1)[0].confirmed       
        setMaxConfirmed(confirmedCount)
      }
    })()
  }, [])

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)

    if (!fetchedData[0]) {
      setIsError(true)
      setErrorMessage(fetchedData[1])
    } else {
      setData(fetchedData[1])
      setCountry(country)
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
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Chart data={data} country={country} />
        <Map
          maxConfirmed={maxConfirmed}
          countries={confirmed}
        />
      </div>
    )
  }
}

export default App
