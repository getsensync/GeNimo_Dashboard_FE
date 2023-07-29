import PropTypes from 'prop-types';
import TicketIcon from '@heroicons/react/24/solid/TicketIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from 'src/utils/backend-url';
import { toFormatted } from 'src/utils/function';

export const OverviewTotalTickets = (props) => {
  const { sx } = props;
  
  const todayPaymentsUrl = serverUrl + '/count/payments/today/spots';
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const fetchTotalCustomers = () => {
    axios
      .get(todayPaymentsUrl)
      .then((res) => {
        let customers = 0;
        let income = 0;
        res.data.forEach((item) => {
          customers += item.count;
          income += item.price*item.count;
        });
        setTotalCustomers(customers);
        setTotalIncome(income);
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
              TODAY SALES
            </Typography>
            <Typography variant="h4">
              $ {toFormatted(totalIncome, true)}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <TicketIcon />
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
            {toFormatted(totalCustomers)}
          </Typography>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            Sold Tickets
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalTickets.prototypes = {
  sx: PropTypes.object,
};
