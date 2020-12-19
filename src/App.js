import React, { useEffect, useState } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { Cards, Chart, CountryPicker, Map } from './components'
import styles from './App.module.css'
import { fetchData, fetchCountries } from './api'

import coronaImage from './images/image.png'

import { makeStyles } from '@material-ui/core/styles'
import 'leaflet/dist/leaflet.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

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

  const [tabValue, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <div className={styles.rootTabs}>
          <AppBar position="static" color="inherit" className={styles.tabsHeader}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="simple tabs" 
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Chart" />
              <Tab label="Map" />
            </Tabs>
          </AppBar>
          <TabPanel value={tabValue} index={0}>
            <Chart data={data} country={country} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Map
              countries={countries}
              center={mapCenter}
              zoom={mapZoom}
            />
          </TabPanel>
        </div>
      </div>
    )
  }
}

export default App
