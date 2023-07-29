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
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

import { toFullString } from 'src/utils/function';

export const LogsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Cust UUID
                </TableCell>
                <TableCell align="center">
                  Name
                </TableCell>
                <TableCell align="center">
                  Type
                </TableCell>
                <TableCell align="center">
                  Amount
                </TableCell>
                <TableCell align='center'>
                  Spot
                </TableCell>
                <TableCell align="center">
                  Timestamp
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => {
                return (
                  <TableRow
                    hover
                    key={index}
                  >
                    <TableCell>
                      {item.uuid}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={item.avatar}>
                          {getInitials(item.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {item.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      {item.type}
                    </TableCell>
                    <TableCell align="right">
                      {item.amount === 0 ? '' : item.amount + '.000'}
                    </TableCell>
                    <TableCell align="left">
                      {item.spot === '-' ? '' : item.spot}
                    </TableCell>
                    <TableCell align="center">
                      {toFullString(item.timestamp)}
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
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Card>
  );
};

LogsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
