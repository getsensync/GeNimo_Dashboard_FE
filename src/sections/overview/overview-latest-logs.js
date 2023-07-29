import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from '@mui/material';
import NextLink from 'next/link';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { serverUrl } from 'src/utils/backend-url';
import { getInitials } from 'src/utils/get-initials';
import { toFullString } from 'src/utils/function';

import axios from 'axios';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestLogs = (props) => {
  const { sx } = props;

  const [data, setData] = useState([]);
  const limit = 5;
  const url = serverUrl + '/logs/all/' + limit;

  const fetchLatestLogs = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLatestLogs();
    const interval = setInterval(() => {
      fetchLatestLogs();
    }
    , 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Activities" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Cust UUID
                </TableCell>
                <TableCell align="center">
                  Name
                </TableCell>
                <TableCell align="center">
                  Type
                </TableCell>
                <TableCell align="center">
                  Amount
                </TableCell>
                <TableCell align='center'>
                  Spot
                </TableCell>
                <TableCell align="center">
                  Timestamp
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <TableRow
                    hover
                    key={index}
                  >
                    <TableCell>
                      {item.uuid}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={item.avatar}>
                          {getInitials(item.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {item.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <SeverityPill
                        color={statusMap[item.type]}
                        sx={{
                          textTransform: 'capitalize',
                          px: 2.5,
                          py: 0.5,
                        }}
                      >
                        {item.type}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="right">
                      {item.amount === 0 ? '' : item.amount + '.000'}
                    </TableCell>
                    <TableCell align="left">
                      {item.spot === '-' ? '' : item.spot}
                    </TableCell>
                    <TableCell align="center">
                      {toFullString(item.timestamp)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
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
          variant="text"
          component={NextLink}
          href="logs"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestLogs.prototype = {
  sx: PropTypes.object
};
