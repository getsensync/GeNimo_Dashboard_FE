import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewTotalTickets } from 'src/sections/overview/overview-total-tickets';
import { OverviewLatestLogs } from 'src/sections/overview/overview-latest-logs';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewHoldAmount } from 'src/sections/overview/overview-hold-amount';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';

import { Authorization } from 'src/author/authorization';

const now = new Date();

const RawPage = () => (
  <>
    <Head>
      <title>
        Overview | GeNimo
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          {/* First Row */}
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalTickets
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewHoldAmount
              sx={{ height: '100%' }}
            />
          </Grid>
          
          {/* Second Row */}
          <Grid
            xs={12}
          >
            <OverviewSales
              sx={{ height: '100%' }}
            />
          </Grid>
          
          {/* Third Row */}
          <Grid
            xs={12}
          >
            <OverviewTraffic
              sx={{ height: '100%' }}
            />
          </Grid>

          {/* Fourth Row */}
          <Grid
            xs={12}
          >
            <OverviewLatestLogs              
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

const Page = () => {
  return (
    <Authorization roles={['admin', 'operator']}>
      <RawPage />
    </Authorization>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
