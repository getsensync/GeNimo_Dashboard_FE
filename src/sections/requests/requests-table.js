import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  SvgIcon,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { toFullString, toCapitalCase, getInitials } from 'src/utils/function';

import axios from 'axios';
import { useAuth } from 'src/hooks/use-auth';
import { toast } from 'react-toastify';
import { serverUrl } from 'src/utils/backend-url';

export const RequestsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    fetchRequests,
  } = props;
  
  const { user } = useAuth();

  const handleApproveClick = (userId, username) => {
    const url = serverUrl + "/requests/approve";
    const data = {
      userId: userId,
      adminId: user?.id,
    };
    axios
      .patch(url, data)
      .then((response) => {
        console.log(response);
        fetchRequests();
        toast.success(<div><span style={{color: "green"}}>Approved</span> request for <b>{username}</b>!</div>);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error approving request!');
      });
  };

  const handleRejectClick = (userId, username) => {
    const url = serverUrl + "/requests/reject/" + userId;
    axios
      .delete(url)
      .then((response) => {
        console.log(response);
        fetchRequests();
        toast.success(<div><span style={{color: "red"}}>Rejected</span> request for <b>{username}</b>!</div>);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error rejecting request!');
      });
  };

  return (
    <Card sx={{paddingTop: 1.5}}>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell align="center">
                  Timestamp
                </TableCell>
                <TableCell align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => {
                const firstname = toCapitalCase(item.first_name) || '';
                const lastname = toCapitalCase(item.last_name) || '';
                const name = firstname + ' ' + lastname;
                return (
                  <TableRow
                    hover
                    key={index}
                  >
                    <TableCell>
                      {item.username}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={item.avatar}>
                          {getInitials(name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      {toFullString(item.request_timestamp)}
                    </TableCell>
                    <TableCell align='center'>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton
                          aria-label="approve"
                          color="success"
                          onClick={() => handleApproveClick(item.id, item.username)}
                          sx={{ p: 0 }}
                        >
                          <SvgIcon fontSize="large">
                            <CheckCircleIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          aria-label="reject"
                          color="error"
                          onClick={() => handleRejectClick(item.id, item.username)}
                          sx={{ p: 0 }}
                        >
                          <SvgIcon fontSize="large">
                            <XCircleIcon />
                          </SvgIcon>
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
      />
    </Card>
  );
};

RequestsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  fetchRequests: PropTypes.func,
};
