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

import axios from 'axios';
import { toast } from 'react-toastify';
import { toCapitalCase } from 'src/utils/function';
import { HighlightSpan } from 'src/components/highlighted-span';
import { serverUrl } from 'src/utils/backend-url';

export const AccountProfile = () => {
  const { user } = useAuth();
  const name = (user?.firstName || user?.lastName) ?
    `${toCapitalCase(user?.firstName)} ${toCapitalCase(user?.lastName)}` : '';

  const requestToBeAdmin = () => {
    axios
      .post(`${serverUrl}/requests/update`, { userId: user?.id })
      .then((res) => {
        console.log(res.data);
        toast.success(<div>Request Sent Successfully <br/> Tell Admin to Approve it!</div>);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error sending request!');
      });
  };

  return (
    <Card>
      <CardContent
        sx={{
          p: 3.5
        }}
      >
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
      <CardActions
        sx={{
          justifyContent: 'center',
        }}
      >
        <Button          
          variant="contained"
          disabled={user?.role === 'admin'}
          onClick={requestToBeAdmin}
        >
          <Typography
            variant="subtitle"
            sx={{ letterSpacing: 0.6 }}
          >
            Request to be <HighlightSpan color={user?.role === 'admin' ? "#bbb" : "yellow"} text="Admin" />
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}

