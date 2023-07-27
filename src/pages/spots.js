import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Grid } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { SpotsTable } from 'src/sections/spot/spots-table';
// import { SpotsSearch } from 'src/sections/spot/spots-search';
import { SpotsForm } from 'src/sections/spot/spots-form';
import { applyPagination } from 'src/utils/apply-pagination';

import axios from "axios";
import { baseUrl } from 'src/utils/backend-url';
import { Authorization } from 'src/author/authorization';

const useSpots = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useSpotIds = (spots) => {
  return useMemo(
    () => {
      return spots.map((item) => item.spotid);
    },
    [spots]
  );
};

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
      name: '',
      price: '',
      active: false,
    });
    setIsFormOpen({ status: true, editOrAdd: 'add', id: null });
  }, []);

  // Inner States & Logics
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState({ status: false, editOrAdd: null, id: null });
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    active: false,
  });

  const spots = useSpots(data, page, rowsPerPage);
  const spotsIds = useSpotIds(spots);
  const spotsSelection = useSelection(spotsIds);
  const url = baseUrl + "/management/spots/all";

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
                    onClick={() => window.location.reload()}
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
              />
            )}
            {/* Search */}
            {/* <SpotsSearch /> */}
            <SpotsTable
              count={data.length}
              items={spots}
              onDeselectAll={spotsSelection.handleDeselectAll}
              onDeselectOne={spotsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={spotsSelection.handleSelectAll}
              onSelectOne={spotsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={spotsSelection.selected}
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
