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

export const LogsSearch = ({query, setQuery, type, setType}) => {

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
          md = {8}
        >          
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search activity"
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
          md = {4}
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
              <MenuItem value="D">( D ) - Deposit</MenuItem>
              <MenuItem value="K">( K ) - Payment</MenuItem>
              <MenuItem value="C">( C ) - Create User</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
};
