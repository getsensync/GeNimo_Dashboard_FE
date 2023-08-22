import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

export const IPSelector = (props) => {

  const {
    ip,
    setIp,
    type,
    setType,
    readers,
  } = props;

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
              {/* <MenuItem value="checkin">Check In</MenuItem> */}
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
              onChange={(event) => setIp(event.target.value)}
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
  type: PropTypes.string,
  setType: PropTypes.func,
  ip: PropTypes.string,
  setIp: PropTypes.func,
  readers: PropTypes.object,
};