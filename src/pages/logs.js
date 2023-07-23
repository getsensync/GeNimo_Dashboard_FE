import { useEffect, useState } from 'react';
import Head from 'next/head';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LogsTable } from 'src/sections/log/logs-table';

import axios from "axios";
import { baseUrl } from 'src/utils/backend-url';
import { Authorization } from 'src/author/authorization';

const RawPage = () => {

  // Inner States & Logics
  const [data, setData] = useState([]);
  const logs = data;
  const url = baseUrl + "/logs/all";
  
  useEffect(() => {
    axios
    .get(url)
    .then((res) => {
      setData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [url]);

  return (
    <>
      <Head>
        <title>
          Activities | GeNimo
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Activities
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                {/* add Refresh button that will load window */}
                <Button
                  color="secondary"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      {/* arrow-path icon */}
                      <ArrowPathIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </Button>
              </Stack>
            </Stack>
            <LogsTable
              items={logs}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

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
