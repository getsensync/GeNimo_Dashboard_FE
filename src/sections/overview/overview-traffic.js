import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { Chart } from 'src/components/chart';
import { baseUrl } from 'src/utils/backend-url';
import axios from 'axios';

export const OverviewTraffic = (props) => {
  const { sx } = props;
  const spotPaymentsUrl = baseUrl + '/count/payments/all';
  // spotDetails is an array of objects
  // each object has attributes: spotid, spotname, price, count
  const [spotDetails, setSpotDetails] = React.useState([]);
  const chartSeries = spotDetails.map((item) => item.count);
  const total = chartSeries.reduce((a, b) => a + b, 0);
  const labels = spotDetails.map((item) => item.spotname);
  const chartOptions = useChartOptions(labels);

  React.useEffect(() => {
    axios.get(spotPaymentsUrl)
      .then((res) => {
        setSpotDetails(res.data);
        // console.log("spotDetails")
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [spotPaymentsUrl]);


  return (
    <Card sx={sx}>
      <CardHeader title="Traffic Source" />
      <CardContent>
        <Chart
          height={400}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        {/* use grid and grid item in center of grid container row */}
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index];
            const percentage = ((item / total) * 100).toFixed(1);

            return (
              <Grid
                item
                key={label}
                lg={2.4}
                md={3}
                sm={4}
                xs={12}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    variant="h6"
                  >
                    {label}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="subtitle1"
                    sx={{ mt: 0.5 }}
                  >
                    {percentage}%
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    dataLabels: {
      enabled: false
    },
    labels: labels,
    legend: {
      offsetX: 50,
      labels: {
        colors: theme.palette.text.primary
      },
      show: true,
      position: 'right',
      fontSize: '16px',
      fontWeight: 600,
      itemMargin: {
        horizontal: 5,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: true
      },
      onItemHover: {
        highlightDataSeries: true
      },
    },
    stroke: {
      colors: [theme.palette.background.paper]
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      theme: theme.palette.mode,
      fillSeriesColor: false,
      style: {
        fontSize: '14px'
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%'
        }
      }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main
    ],
  };
};

OverviewTraffic.propTypes = {
  sx: PropTypes.object
};
