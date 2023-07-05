import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from 'src/utils/backend-url';
import { toFormatted } from 'src/utils/function';

export const OverviewTotalCustomers = (props) => {
  const { sx } = props;

  const todayPaymentsUrl = baseUrl + '/count/payments/today/spots';
  const todayDepositsUrl = baseUrl + '/count/deposits/today';
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalSpots, setTotalSpots] = useState(0);

  const fetchTotalPayments = () => {
    axios
      .get(todayPaymentsUrl)
      .then((res) => {
        let payments = 0;
        let spots = 0;
        res.data.forEach((item) => {
          payments += item.count;
          spots += 1;
        });
        setTotalPayments(payments);
        setTotalSpots(spots);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTotalDeposits = () => {
    axios
      .get(todayDepositsUrl)
      .then((res) => {
        setTotalDeposits(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTotalPayments();
    fetchTotalDeposits();
  }, [todayPaymentsUrl]);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Today Customers
            </Typography>
            <Typography variant="h4">
              {toFormatted(totalPayments)} + {toFormatted(totalDeposits)}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            sales + top up
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Typography
              color='text.secondary'
              variant="subtitle2"
            >
              From
            </Typography>
            <Typography
              color='success.main'
              variant="subtitle2"
            >
              {totalSpots}
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Active Spots
            </Typography>
          </Stack>
        </Stack>
        
      </CardContent>
    </Card>
  );
};

OverviewTotalCustomers.propTypes = {
  sx: PropTypes.object
};

