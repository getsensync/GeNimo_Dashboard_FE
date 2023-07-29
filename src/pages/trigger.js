import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateUserForm } from 'src/sections/trigger/create-user-form';
import { TopUpForm } from 'src/sections/trigger/top-up-form';
import { IPSelector } from 'src/sections/trigger/trigger-ip-selector';

import { Authorization } from 'src/author/authorization';
import { readerUrl } from 'src/utils/backend-url';

const changeUrl = (url, ip) => {
  // the url is a string : http://localhost:8080/commandTrigger
  // we need to change the url to http://ip:8080/commandTrigger
  // so we split the url into 3 parts
  const afterIP = url.split(":")[2];
  const newUrl = `http://${ip}:${afterIP}`;
  console.log(newUrl);
  return newUrl;
};

const RawPage = () => {
  // Inner Functions
  const handleCreateUserClick = useCallback(() => {
    setIsCreateUser(true);
  }, []);

  const handleTopUpClick = useCallback(() => {
    setIsTopUp(true);
  }, []);

  // Inner States & Logics
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [isTopUp, setIsTopUp] = useState(false);
  const [ip, setIp] = useState('');

  return (
    <>
      <Head>
        <title>
          Reader | GeNimo
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={1}
            minHeight='90vh'
            component="content"
          >
            <Typography variant="h4">
              Trigger - A Reader
            </Typography>
            <IPSelector
              ip={ip}
              setIP={setIp}
            />
            <Stack
              flex={1}
              justifyContent='center'
              spacing={3}
              pb="10%"
            >
              <Typography
                variant="h6"
                align='center'
              >
                Trigger a reader to create a new user or top up
              </Typography>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={4}
              >
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowPathIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleTopUpClick}
                >
                  Top Up
                </Button>
                <Button
                  color='secondary'
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleCreateUserClick}
                >
                  Create User
                </Button>
              </Stack>
            </Stack>
            {isCreateUser && (
              <CreateUserForm 
                isFormOpen={isCreateUser}
                setIsFormOpen={setIsCreateUser}
                readerUrl={changeUrl(readerUrl, ip)}
              />
            )}
            {isTopUp && (
              <TopUpForm
                isFormOpen={isTopUp}
                setIsFormOpen={setIsTopUp}
                readerUrl={changeUrl(readerUrl, ip)}
              />
            )}
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
