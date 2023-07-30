import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
// source path : assets of profile images
const maleAvatar = '/assets/avatars/avatar-marcus-finn.png';
const femaleAvatar = '/assets/avatars/avatar-neha-punita.png';

import { toCapitalCase } from 'src/utils/function';

export const AccountProfile = () => {
  const { user } = useAuth();
  const name = (user.firstName || user.lastName) ?
    `${toCapitalCase(user?.firstName)} ${toCapitalCase(user?.lastName)}` : '';

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user?.gender === "male" ? maleAvatar : femaleAvatar}
            sx={{
              height: 80,
              width: 80,
              mb: 2,
            }}
          />
          <Typography
            color="text.primary"
            variant="h5"
          >
            {user?.username}
          </Typography>
          <Typography
            color="text.secondary"
            variant="subtitle1"
            sx={{ mb: 3 }}
          >
            <span style={{ color: "green" }}>{user?.email}</span>
          </Typography>
          <Typography
            color="text.primary"
            variant="h6"
          >
            {name}
          </Typography>
          {/* email */}
          <Typography
            color="text.primary"
            variant="h6"
          >
            <span style={{ color: "blue" }}>{user?.role}</span>
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
          disabled
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}

