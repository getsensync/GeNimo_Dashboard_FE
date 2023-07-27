import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Card,
  Grid,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

export const CustomersSearch = ({query, setQuery, type, setType, active, setActive}) => {

  return (
    <Card sx={{ p: 1 }}>
      <Grid
        alignItems="center"
        container
        spacing={3}
        sx={{ px: 3 }}
      >
        <Grid
          item
          xs = {12}
          md = {7}
        >          
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search customer"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon
                  color="action"
                  fontSize="small"
                >
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            )}
          />
        </Grid>
        <Grid
          item
          xs = {12}
          md = {2}
        >
          <FormControl
            fullWidth
            required
          >
            <InputLabel id="type">Types</InputLabel>
            <Select
              labelId="type"
              label="Type"
              name="type"
              onChange={(event) => setType(event.target.value)}
              value={type}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="AES">AES</MenuItem>
              <MenuItem value="DES">DES</MenuItem>
              <MenuItem value="3DES">3DES</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs = {12}
          md = {3}
        >
          <FormControl
            fullWidth
            required
          >
            <InputLabel id="active">Status</InputLabel>
            <Select
              labelId="active"
              label="Active"
              name="active"
              onChange={(event) => setActive(event.target.value)}
              value={active}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="true">Active User</MenuItem>
              <MenuItem value="false">Non-Active User</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
};
