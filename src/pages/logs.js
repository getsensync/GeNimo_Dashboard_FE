import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LogsTable } from 'src/sections/log/logs-table';
import { LogsForm } from 'src/sections/log/logs-form';

import axios from "axios";
import { baseUrl } from 'src/utils/backend-url';


const Page = () => {
  // Inner Functions
  const handleAddClick = useCallback(() => {
    setFormData({
      uuid: '00000000',
      amount: '0',
      type: 'create',
    });
    setIsFormOpen({ status: true });
  }, []);

  // Inner States & Logics
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState({ status: false });
  const [formData, setFormData] = useState({
    uuid: '00000000',
    amount: '0',
    type: 'create',
  });
  const logs = data;
  const url = baseUrl + "/management/customers/all";
  
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
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleAddClick}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            {isFormOpen.status && (
              <LogsForm 
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            <LogsTable
              items={logs}
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
              formData={formData}
              setFormData={setFormData}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
