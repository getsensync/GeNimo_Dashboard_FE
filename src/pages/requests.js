import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { RequestsTable } from 'src/sections/requests/requests-table';
import { applyPagination } from 'src/utils/apply-pagination';

import axios from "axios";
import { toast } from 'react-toastify';
import { serverUrl } from 'src/utils/backend-url';
import { Authorization } from 'src/author/authorization';

const RawPage = () => {
  // Inner Functions
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
      setPage(0);
    },
    []
  );

  // Inner States & Logics
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(data.length);
  const url = serverUrl + "/requests/false";
  
  const useItems = (data, page, rowsPerPage) => {
    return useMemo(() => {
      setCount(data.length);
      return applyPagination(data, page, rowsPerPage);
    }, [data, page, rowsPerPage]);
  };

  const fetchRequests = () => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const refresh = () => {
    setPage(0);
    fetchRequests();
    toast.success('Privilege Requests Refreshed');
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  
  return (
    <>
      <Head>
        <title>
          Requests | GeNimo
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Typography variant="h4">
                Privilege Requests 
              </Typography>
              <Button
                color="secondary"
                startIcon={(
                  <SvgIcon fontSize="small">
                    {/* arrow-path icon */}
                    <ArrowPathIcon />
                  </SvgIcon>
                )}
                variant="contained"
                onClick={refresh}
              >
                Refresh
              </Button>
            </Stack>
            <Typography
              color="text.secondary"
              variant="h6"
            >
              Approve or reject privilege requests from operators.
            </Typography>
            <RequestsTable
              count={count}
              items={useItems(data, page, rowsPerPage)}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              fetchRequests={fetchRequests}
            />
            {/* If there is no data, display in center */}
            {data.length === 0 && (
              <Typography
                color="text.secondary"
                variant="h6"
                align="center"
                pt={3}
              >
                No requests found.
              </Typography>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

const Page = () => {
  return (
    <Authorization roles={['admin']}>
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
