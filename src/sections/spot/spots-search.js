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

export const SpotsSearch = ({setPage, query, setQuery, active, setActive}) => {

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
            // defaultValue=""
            fullWidth
            placeholder="Search spot"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(0);
            }}
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
            <InputLabel id="active">Status</InputLabel>
            <Select
              labelId="active"
              label="Active"
              name="active"
              onChange={(event) => {
                setActive(event.target.value)
                setPage(0);
              }}
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
