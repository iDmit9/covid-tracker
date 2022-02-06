import React from 'react'
import { NativeSelect, FormControl } from '@mui/material'

import {CountryType} from '../../api'

import styles from './CountryPicker.module.css'

type CountryPickerProps = {
   countries: Array<CountryType>
   handleCountryChange: (selectedCountry: string) => void
}

const CountryPicker = ({countries, handleCountryChange}: CountryPickerProps) => {

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