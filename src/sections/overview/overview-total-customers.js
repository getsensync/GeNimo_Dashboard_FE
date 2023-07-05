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
  const { difference, positive = false, sx, value } = props;

  const todayPaymentsUrl = baseUrl + '/count/payments/today/spots';
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSpots, setTotalSpots] = useState(0);

  const fetchTotalCustomers = () => {
    axios
      .get(todayPaymentsUrl)
      .then((res) => {
        let customers = 0;
        let spots = 0;
        res.data.forEach((item) => {
          customers += item.count;
          spots += 1;
        });
        setTotalCustomers(customers);
        setTotalSpots(spots);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTotalCustomers();
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
              {toFormatted(totalCustomers)}
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
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2 }}
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
      </CardContent>
    </Card>
  );
};

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};

