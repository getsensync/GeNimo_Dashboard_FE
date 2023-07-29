import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { CustomersForm } from 'src/sections/customer/customers-form';
import { applyPagination } from 'src/utils/apply-pagination';
import { toFullString, toDateString } from 'src/utils/function';

import axios from "axios";
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
    },
    []
  );

  const handleAddClick = useCallback(() => {
    setFormData({
      uuid: '',
      name: '',
      dob: 'dd/mm/yyyy',
      balance: '',
      type: '',
      active: false,
    });
    setIsFormOpen({ status: true, editOrAdd: 'add', id: null });
  }, []);

  // Inner States & Logics
  const [query, setQuery] = useState(''); // Search query
  const [type, setType] = useState('All'); // Search type
  const [active, setActive] = useState('All'); // Search active
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(data.length); // Total Customers
  const [isFormOpen, setIsFormOpen] = useState({ status: false, editOrAdd: null, id: null });
  const [formData, setFormData] = useState({
    uuid: '',
    name: '',
    dob: 'dd/mm/yyyy',
    balance: '',
    type: '',
    active: false,
  });
  const url = serverUrl + "/management/customers/all";
  const keys = ['customeruuid', 'customername', 'balance', 'lastmodified'];

  const FilteredCustomers = (data, page, rowsPerPage, query, type, active) => {
    return useMemo(() => {
      let filtered = data;
      if (query) {
        const allowed = ['0', '00', '000'];
        const period = query.includes('.');
        const slash = query.includes('/');
        const [first, second] = query.split('.');
        filtered = filtered.filter((item) => {
          // Slash Handler
          if (slash) {
            const date = toDateString(item['dateofbirth']);
            return date.includes(query);
          }
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
      if (type !== 'All') {
        filtered = filtered.filter((item) => {
          if (item['encryptiontype'] === type) {
            return true;
          }
          return false;
        });
      }
      if (active !== 'All') {
        filtered = filtered.filter((item) => {
          if (item['isactive'].toString() === active) {
            return true;
          }
          return false;
        });
      }
      setCount(filtered.length);
      return applyPagination(filtered, page, rowsPerPage);
    }, [data, page, rowsPerPage, query, type, active]);
  };

  const fetchCustomers = () => {
    axios
    .get(url)
    .then((res) => {
      setData(res.data);
      setCount(res.data.length);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <Head>
        <title>
          Customers | GeNimo
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
              justifyContent="space-around"
            >
              <Typography variant="h4">
                Customers
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
                    onClick={fetchCustomers}
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
              <CustomersForm 
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                formData={formData}
                setFormData={setFormData}
                fetchCustomers={fetchCustomers}
              />
            )}
            {/* Search */}
            <CustomersSearch
              query={query}
              setQuery={setQuery}
              type={type}
              setType={setType}
              active={active}
              setActive={setActive}
            />
            <CustomersTable
              count={count}
              items={FilteredCustomers(data, page, rowsPerPage, query, type, active)}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
              formData={formData}
              setFormData={setFormData}
              fetchCustomers={fetchCustomers}
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
