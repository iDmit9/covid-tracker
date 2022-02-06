import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import CountUp from "react-countup";
import cx from "classnames";

import { MainDataType } from "../../api";

import styles from "./Cards.module.css";

const Cards = ({data: { cases, recovered, deaths, updated }}: {data: MainDataType}) => {
  if (!cases) {
    return <div>Loading ...</div>;
  }

  return (
    <div className={styles.container}>
      <Grid
        container
        spacing={3}
        justifyContent='center'
        className={styles.gridContainer}
      >
        <Grid item xs={12} sm={4} md={3} className={styles.item}>
          <Card className={cx(styles.card, styles.infected)}>               
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Infected
              </Typography>
              <Typography variant='h5'>
                <CountUp start={0} end={cases} duration={2.5} separator=',' />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(updated).toLocaleDateString()}
              </Typography>
              <Typography variant='body2'>
                Number of active cases of Covid-19
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className={styles.item}>
          <Card className={cx(styles.card, styles.recovered)}>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Recovered
              </Typography>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={recovered}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(updated).toLocaleDateString()}
              </Typography>
              <Typography variant='body2'>
                Number of recovered from Covid-19
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className={styles.item}>
          <Card className={cx(styles.card, styles.deaths)}>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Deaths
              </Typography>
              <Typography variant='h5'>
                <CountUp start={0} end={deaths} duration={2.5} separator=',' />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(updated).toLocaleDateString()}
              </Typography>
              <Typography variant='body2'>
                Number of deaths caused by Covid-19
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;