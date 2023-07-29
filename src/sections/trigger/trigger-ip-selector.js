import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Stack,
  Grid,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

import { ip_byReaders } from 'src/utils/ip-addresses/ip-addresses-by-readers';

const create_readers = ip_byReaders.readers[0].spots;
const topup_readers = ip_byReaders.readers[1].spots;
const checkin_readers = ip_byReaders.readers[2].spots;

const keys = ['create', 'topup', 'checkin'];
const readers = {
  create: create_readers,
  topup: topup_readers,
  checkin: checkin_readers,
};


export const IPSelector = (props) => {

  const {
    ip,
    setIP,
  } = props;

  const [type, setType] = useState('create');

  useEffect(() => {
    setIP(readers[type][0].ip);
  }, [type]);

  return (
    <Card sx={{pt:5}}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={4}
        >
          {/* Make form control selection to select trigger type */}
          <FormControl
            fullWidth
            required
          >
            <InputLabel id="type">Reader Type</InputLabel>
            <Select
              labelId="type"
              label="Type"
              name="type"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value="create">Create</MenuItem>
              <MenuItem value="topup">Top Up</MenuItem>
              <MenuItem value="checkin">Check In</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
        >
          {/* Based on type select IP address */}
          <FormControl
            fullWidth
            required
          >
            <InputLabel id="ip">IP Address</InputLabel>
            <Select
              labelId="ip"
              label="IP"
              name="ip"
              value={ip}
              onChange={(event) => setIP(event.target.value)}
            >
              {readers[type].map((reader) => (
                <MenuItem
                  key={reader.id}
                  value={reader.ip}>{reader.ip} - {reader.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
};

IPSelector.propTypes = {
  ip: PropTypes.string,
  setIP: PropTypes.func,
};