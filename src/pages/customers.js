import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { CustomersForm } from 'src/sections/customer/customers-form';
import { applyPagination } from 'src/utils/apply-pagination';

import axios from "axios";
import { customersData, } from 'src/utils/data';
import { baseUrl } from 'src/utils/backend-url';
import { set } from 'nprogress';

const useCustomers = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState(customersData);
  const [isFormOpen, setIsFormOpen] = useState({ status: false, editOrAdd: null, uuid: null });
  const [formData, setFormData] = useState({
    uuid: '',
    name: '',
    dob: new Date(0),
    balance: '',
    type: '',
  });

  const customers = useCustomers(data, page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const url = baseUrl + "/getData/user/all";

  // useEffect(() => {
  //   axios
  //   .get(url)
  //   .then((res) => {
  //     setData(res.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }, []);

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
      dob: new Date(0),
      balance: '',
      type: '',
    });
    setIsFormOpen({ status: true, editOrAdd: 'add', uuid: null });
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
          py: 8
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
                  Customers
                </Typography>
                {/* Import & Export Data */}
                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
              </Stack>
              <div>
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
              </div>
            </Stack>
            {/* Search */}
            {isFormOpen.status && (
              <CustomersForm 
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {/* <CustomersSearch /> */}
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
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
