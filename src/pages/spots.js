import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { SpotsTable } from 'src/sections/spot/spots-table';
import { SpotsSearch } from 'src/sections/spot/spots-search';
import { SpotsForm } from 'src/sections/spot/spots-form';
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

  const handleAddClick = useCallback(() => {
    setFormData({
      name: '',
      price: '',
      active: false,
    });
    setIsFormOpen({ status: true, editOrAdd: 'add', id: null });
  }, []);

  // Inner States & Logics
  const [query, setQuery] = useState(''); // Search query
  const [active, setActive] = useState('All'); // Search active 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(data.length); // Total Spots
  const [isFormOpen, setIsFormOpen] = useState({ status: false, editOrAdd: null, id: null });
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    active: false,
  });

  const url = serverUrl + "/management/spots/all";
  const keys = ['spotname', 'price', 'lastmodified'];

  const FilteredSpots = (data, page, rowsPerPage, query, active) => {
    return useMemo(() => {
      let filteredData = data;
      if (query) {
        const allowed = ['0', '00', '000'];
        const period = query.includes('.');
        const [first, second] = query.split('.');
        filteredData = filteredData.filter((item) => {
          // Period Handler
          if (period) {
            // if first and second are both empty, return true
            if (second && !allowed.includes(second)) {
              return false;
            }
            if (!first) {
              return true;
            }
            else if (first && item['price'].toString() === first) {
              return true;
            }
          }
          // Normal Handler
          for (const key of keys) {
            if (key === 'lastmodified') {
              if (toFullString(item[key]).toLowerCase().includes(query.toLowerCase())) {
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
      if (active !== 'All') {
        filteredData = filteredData.filter((item) => {
          if (item['isactive'].toString() === active) {
            return true;
          }
          return false;
        });
      }
      setCount(filteredData.length);
      return applyPagination(filteredData, page, rowsPerPage);
    }, [data, page, rowsPerPage, query, active]);
  };

  const fetchSpots = () => {
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
    setActive('All');
    setPage(0);
    fetchSpots();
    toast.success('Spots Refreshed');
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  return (
    <>
      <Head>
        <title>
          Spots | GeNimo
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
            >
              <Typography variant="h4">
                Spots
              </Typography>
              {/* add Refresh button that will load window */}
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                spacing={1}
              >
                <Grid item>
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
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
            </Stack>
            {isFormOpen.status && (
              <SpotsForm 
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                formData={formData}
                setFormData={setFormData}
                fetchSpots={fetchSpots}
              />
            )}
            {/* Search */}
            <SpotsSearch
              setPage={setPage}
              query={query}
              setQuery={setQuery}
              active={active}
              setActive={setActive}
            />
            <SpotsTable
              count={count}
              items={FilteredSpots(data, page, rowsPerPage, query, active)}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
              formData={formData}
              setFormData={setFormData}
              fetchSpots={fetchSpots}
            />
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
