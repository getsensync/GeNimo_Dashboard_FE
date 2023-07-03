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
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Chart } from 'src/components/chart';
import { baseUrl } from 'src/utils/backend-url';
import axios from 'axios';

import { monthNumber, monthString, zeroMonthCounter } from 'src/utils/data';

export const OverviewSales = (props) => {
  const { sx } = props;
  const chartOptions = useChartOptions();
  const thisYearSaleUrl = baseUrl + '/payments/count/annual/' + new Date().getFullYear();
  const lastYearSaleUrl = baseUrl + '/payments/count/annual/' + (new Date().getFullYear() - 1);
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    axios
      .get(thisYearSaleUrl)
      .then((response) => {
        const thisYearSale = response.data;
        const thisYearData = monthNumber.map((month) => {
          const monthSale = thisYearSale.findIndex((sale) => sale.month === month);
          if (monthSale !== -1) {
            return thisYearSale[monthSale].count;
          } else {
            // return 0;
            return Math.floor(Math.random() * 40) + 1;
          }
        });
        axios
          .get(lastYearSaleUrl)
          .then((response) => {
            const lastYearSale = response.data;
            const lastYearData = monthNumber.map((month) => {
              const monthSale = lastYearSale.findIndex((sale) => sale.month === month);
              if (monthSale !== -1) {
                return lastYearSale[monthSale].count;
              } else {
                // return 0;
                return Math.floor(Math.random() * 40) + 1;
              }
            });
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
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
          >
            Sync
          </Button>
        )}
        title="Ticket Sales"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
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

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: monthString,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

OverviewSales.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
