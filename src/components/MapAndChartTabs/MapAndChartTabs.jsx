import React, { useState } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import styles from './MapAndChartTabs.module.css'

import { Chart, Map } from '../'

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

const MapAndChartTabs = ({data, country, countries, mapCenter, mapZoom}) => {
   const [tabValue, setValue] = useState(0);

   const handleTabChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
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
   )
}

export default MapAndChartTabs
