import PropTypes from 'prop-types';
import NextLink from 'next/link';
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
import { toast } from 'react-toastify';

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
            toast.success('Displaying Monthly Data over Days!');
          })
          .catch((error) => {
            console.log(error);
            toast.error('Failed to Fetch Last Month Data!');
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to Fetch This Month Data!');
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
            toast.success('Displaying Annual Data over Months!');
          })
          .catch((error) => {
            console.log(error);
            toast.error('Failed to Fetch Last Year Data!');
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to Fetch This Year Data!');
      });
  };

  const handleType = () => {
    if (isMonthly) {
      FetchMonthlyData();
    } else {
      FetchAnnualData();
    }
  };

  const handleTypeChange = () => {
    setIsMonthly(!isMonthly);
    if (isMonthly) {
      FetchAnnualData();
    } else {
      FetchMonthlyData();
    }
  };

  // First Fetch, isMonthly ? fetch monthly data : fetch annual data
  // based on isMonthly initial value
  useEffect(() => {
    FetchAnnualData();
  }, []);

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
              onClick={handleTypeChange}
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
            onClick={handleType}
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
          component={NextLink}
          // href is "/logs" with params type=payment
          href={{
            pathname: '/logs',
            query: { type: 'K' }
          }}
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
