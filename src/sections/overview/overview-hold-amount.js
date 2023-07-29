import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from 'src/utils/backend-url';
import { toFormatted } from 'src/utils/function';

export const OverviewHoldAmount = (props) => {
  const { sx } = props;
  const holdAmountUrl = serverUrl + '/count/balance/all';

  // Fetch data from API
  const [data, setData] = useState([]);

  const fetchDeposits= () => {
    axios
      .get(holdAmountUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDeposits();
  }, [holdAmountUrl]);

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
              Hold Amount
            </Typography>
            <Typography variant="h4">
              $ {toFormatted(data.amount, true)}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
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
            {data.count}
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            Registered Customers
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewHoldAmount.propTypes = {
  sx: PropTypes.object
};
