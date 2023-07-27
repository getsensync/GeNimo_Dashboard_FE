import { useEffect, useState } from 'react';
import Head from 'next/head';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LogsTable } from 'src/sections/log/logs-table';
import { LogsSearch } from 'src/sections/log/log-search';
import { toFullString } from 'src/utils/function';

import axios from "axios";
import { baseUrl } from 'src/utils/backend-url';
import { Authorization } from 'src/author/authorization';

const RawPage = () => {

  // Inner States & Logics
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(''); // Search query
  const [type, setType] = useState('All'); // Search type
  const keys = ['uuid', 'name', 'amount', 'spot', 'timestamp'];
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

  const filter = (items) => {
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
          else if (first && item['amount'].toString().includes(first)) {
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
    return items;
  };

  const refresh = () => {
    setQuery('');
    setType('All');
    axios
    .get(url)
    .then((res) => {
      setData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

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
                Activities
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
              query={query}
              setQuery={setQuery}
              type={type}
              setType={setType}
            />
            <LogsTable
              items={filter(logs)}
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
