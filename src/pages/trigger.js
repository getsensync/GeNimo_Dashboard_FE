import { useCallback, useState } from 'react';
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
import { HighlightSpan } from 'src/components/highlighted-span';

import { ip_byReaders } from 'src/utils/ip-addresses/ip-addresses-by-readers';

const create_readers = ip_byReaders.readers[0].spots;
const topup_readers = ip_byReaders.readers[1].spots;
// const checkin_readers = ip_byReaders.readers[2].spots;
// -->
const readers = {
  create: create_readers,
  topup: topup_readers,
  // checkin: checkin_readers,
};


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
  const [type, setType] = useState(window.sessionStorage.getItem('type') || 'create');
  const [ip, setIp] = useState(window.sessionStorage.getItem('ip') || '192.168.0.23');

  const handleSetIp = (val) => {
    setIp(val);
    window.sessionStorage.setItem('ip', val);
  };

  const handleSetType = (val) => {
    setType(val);
    window.sessionStorage.setItem('type', val);
    // also set the ip to the first ip of the selected type
    handleSetIp(readers[val][0].ip);
  };

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
          >
            <Typography variant="h4">
              Trigger - A Reader
            </Typography>
            <IPSelector
              ip={ip}
              setIp={handleSetIp}
              type={type}
              setType={handleSetType}
              readers={readers}
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
                || Top Up || Create User ||
              </Typography>
              <Typography
                variant="subtitle1"
                align='center'
              >
                Ensure that the <HighlightSpan color='blue' text='IP address' /> is <HighlightSpan color='red' text='correct' /> and the <HighlightSpan color='green' text='Reader' /> is <HighlightSpan color='red' text='connected' /> to network.
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
                  disabled={type !== 'topup'}
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
                  disabled={type !== 'create'}
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
