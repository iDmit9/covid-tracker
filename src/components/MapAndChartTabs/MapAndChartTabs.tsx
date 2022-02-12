import React, { ChangeEvent, useState } from 'react'

import {Tabs, Tab, AppBar, Box} from '@mui/material';

import styles from './MapAndChartTabs.module.css'

import { MainDataType, CountryType } from 'api'
import { Chart, Map } from 'components'

type TabPanelProps = {
   value: number
   index: number
   children: React.ReactNode
   other?: Array<any>
}

function TabPanel(props: TabPanelProps) {
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

type MapAndChartTabsProps = {
   data: MainDataType
   country: string   
   countries: Array<CountryType>
   mapCenter: [number, number]
   mapZoom: number
}

const MapAndChartTabs = ({data, country, countries, mapCenter, mapZoom}: MapAndChartTabsProps) => {
   const [tabValue, setTabValue] = useState(0);

   const handleTabChange = (event: ChangeEvent<{}>, newValue: number):void => {
      setTabValue(newValue);
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
