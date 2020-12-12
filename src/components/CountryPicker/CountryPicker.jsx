import React from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import styles from './CountryPicker.module.css'

const CountryPicker = ({countries,  handleCountryChange }) => {

   return (
      <FormControl className={styles.formControl}>
         <NativeSelect defaultValue='global' onChange={(e) => handleCountryChange(e.target.value)}>
            <option value='global'>Global</option>
            {countries && countries.map((country) => <option key={country.country} value={country.country}>{country.country}</option>)}
         </NativeSelect>
      </FormControl>
   )
}

export default CountryPicker