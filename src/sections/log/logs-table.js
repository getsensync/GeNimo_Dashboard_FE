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
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, PlayArrow, Stop } from '@mui/icons-material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

import { toFullString, toDateString, toDateStrip } from 'src/utils/function';
import axios from 'axios';
import { baseUrl } from 'src/utils/backend-url';

const deleteUrl = baseUrl + "/management/customers/delete/";
const activationUrl = baseUrl + "/activation/customer/";

export const LogsTable = (props) => {
  const {
    items = [],
    isFormOpen,
    setIsFormOpen,
    formData,
    setFormData,
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
                {/* make cell for spot */}
                <TableCell align='center'>
                  Spot
                </TableCell>
                <TableCell align="center">
                  Amount
                </TableCell>
                <TableCell align="center">
                  Type
                </TableCell>
                <TableCell align="center">
                  Timestamp
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => {
                const dOB = item.dateofbirth ? toDateString(item.dateofbirth) : 'N/A';
                const createdAT = item.createdat ? toDateString(item.createdat) : 'N/A';
                const lastModified = item.lastmodified ? toFullString(item.lastmodified) : 'N/A';
                return (
                  <TableRow
                    hover
                    key={index}
                  >
                    <TableCell>
                      {item.customeruuid}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={item.avatar}>
                          {getInitials(item.customername)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {item.customername}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      Reed-o-wheel
                    </TableCell>
                    <TableCell align="right">
                      {item.balance}
                    </TableCell>
                    <TableCell align="center">
                      K
                    </TableCell>
                    <TableCell align="center">
                      {lastModified}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

LogsTable.propTypes = {
  items: PropTypes.array,
  isFormOpen: PropTypes.object.isRequired,
  setIsFormOpen: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
