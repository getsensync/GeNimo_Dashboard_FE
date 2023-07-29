import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Chart } from 'src/components/chart';
import { serverUrl } from 'src/utils/backend-url';
import axios from 'axios';

import { configMonthly, configAnnual } from 'src/utils/chart-options/overview-sales';
import { completeMonthInYear, completeDayInMonth } from 'src/utils/function';

export const OverviewSales = (props) => {
  const { sx } = props;
  const [isMonthly, setIsMonthly] = useState(false);
  const [chartSeries, setChartSeries] = useState([]);

  const FetchMonthlyData = () => {
    const thisMonthSaleUrl = serverUrl + '/count/payments/monthly/' + (new Date().getMonth() + 1);
    const lastMonthSaleUrl = serverUrl + '/count/payments/monthly/' + (new Date().getMonth());
    axios
      .get(thisMonthSaleUrl)
      .then((response) => {
        const thisMonth = response.data;
        const thisMonthData = completeDayInMonth(thisMonth, new Date().getMonth() + 1).map((day) => day.count);
        axios
          .get(lastMonthSaleUrl)
          .then((response) => {
            const lastMonth = response.data;
            const lastMonthData = completeDayInMonth(lastMonth, new Date().getMonth()).map((day) => day.count);
            setChartSeries([
              {
                name: "This Month",
                data: thisMonthData
              },
              {
                name: "Last Month",
                data: lastMonthData
              }
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const FetchAnnualData = () => {
    const thisYearSaleUrl = serverUrl + '/count/payments/annual/' + new Date().getFullYear();
    const lastYearSaleUrl = serverUrl + '/count/payments/annual/' + (new Date().getFullYear() - 1);
    axios
      .get(thisYearSaleUrl)
      .then((response) => {
        const thisYear = response.data;
        const thisYearData = completeMonthInYear(thisYear).map((month) => month.count);
        axios
          .get(lastYearSaleUrl)
          .then((response) => {
            const lastYear = response.data;
            const lastYearData = completeMonthInYear(lastYear).map((month) => month.count);
            setChartSeries([
              {
                name: "This Year",
                data: thisYearData
              },
              {
                name: "Last Year",
                data: lastYearData
              }
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleType = () => {
    setIsMonthly(!isMonthly);
    if (isMonthly) {
      FetchMonthlyData();
    } else {
      FetchAnnualData();
    }
  };

  useEffect(() => {
    if (isMonthly) {
      FetchMonthlyData();
    } else {
      FetchAnnualData();
    }
  }, [isMonthly]);

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              flexWrap: 'wrap',
              my: -1.5
            }}
          >
            <Button
              color="inherit"
              size="small"
              startIcon={(
                <SvgIcon fontSize="small">
                  <ArrowPathIcon />
                </SvgIcon>
              )}
              onClick={handleType}
            >
              {isMonthly ? 'Annual' : 'Monthly'}
            </Button>
            <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
            onClick={isMonthly ? FetchMonthlyData : FetchAnnualData}
          >
            Sync
          </Button>
          </Stack>
        )}
        title="Ticket Sales"
      />
      <CardContent>
        <Chart
          height={350}
          options={isMonthly ? configMonthly : configAnnual}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          Overview
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewSales.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
