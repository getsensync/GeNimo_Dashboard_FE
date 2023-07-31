import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LogsTable } from 'src/sections/log/logs-table';
import { LogsSearch } from 'src/sections/log/logs-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { toFullString } from 'src/utils/function';

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(data.length); // Total Logs
  const [query, setQuery] = useState(''); // Search query
  const [type, setType] = useState('All'); // Search type
  const keys = ['uuid', 'name', 'amount', 'spot', 'timestamp'];
  const logs = data;
  const url = serverUrl + "/logs/all";
  
  const FilteredLogs = (data, page, rowsPerPage, query, type) => {
    return useMemo(() => {
      let items = data;
      if (query) {
        const allowed = ['0', '00', '000'];
        const period = query.includes('.');
        const [first, second] = query.split('.');
        items = items.filter((item) => {
          // Period Handler
          if (period) {
            // if first and second are both empty, return true
            if (second && !allowed.includes(second)) {
              return false;
            }
            if (!first) {
              return item['type'] !== 'C';
            }
            else if (first && item['amount'].toString() === first) {
              return true;
            }
          }
          // Normal Handler
          for (const key of keys) {
            if (key === 'timestamp') {
              if (toFullString(item[key]).toLowerCase().includes(query.toLowerCase())) {
                return true;
              }
            }
            else if (key === 'amount' && allowed.includes(query)) {
              if (item['type'] === 'D' || item['type'] === 'K') {
                return true;
              }
            }
            else if (item[key].toString().toLowerCase().includes(query.toLowerCase())) {
              return true;
            }
          }
          return false;
        });
      }
      if (type !== 'All') {
        items = items.filter((item) => item.type === type);
      }
      setCount(items.length);
      return applyPagination(items, page, rowsPerPage);
    }, [data, page, rowsPerPage, query, type]);
  };

  const fetchLogs = () => {
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
    setQuery('');
    setType('All');
    setPage(0);
    fetchLogs();
    toast.success('Activity Logs Refreshed');
  };

  useEffect(() => {
    fetchLogs();
    // i.e http://localhost:3000/logs
    // if http://localhost:3000/logs?type=K
    // set type to payment
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type) {
      setType(type);
    }
  }, []);
  
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
          <Stack spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Typography variant="h4">
                Activity Logs 
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
            <LogsSearch
              setPage={setPage}
              query={query}
              setQuery={setQuery}
              type={type}
              setType={setType}
            />
            <LogsTable
              count={count}
              items={FilteredLogs(logs, page, rowsPerPage, query, type)}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
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
