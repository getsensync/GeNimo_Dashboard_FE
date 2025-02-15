import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

import { toast } from 'react-toastify';
import { toCapitalCase } from 'src/utils/function';
import { HighlightSpan } from 'src/components/highlighted-span';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();
  const user = auth.user;
  const name = (user?.firstName || user?.lastName) ?
    `${toCapitalCase(user?.firstName)} ${toCapitalCase(user?.lastName)}` : '';

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
      toast.success('Logout success');
    },
    [auth, onClose, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.primary"
          variant="subtitle1"
        >
          {user?.username}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          <HighlightSpan color="red" text='Sign Out' style={{letterSpacing: '0.6px'}}/>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
