import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, PlayArrow, Stop } from '@mui/icons-material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

import { dateToString, dateToDateString, dateToDateStringSlash } from 'src/utils/function';
import axios from 'axios';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    isFormOpen,
    setIsFormOpen,
    formData,
    setFormData,
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const handleEditClick = (_id) => {
    const editCustomer = items.find((customer) => customer._id === _id);
    setFormData(
      {
        uuid: editCustomer.uuid,
        name: editCustomer.name,
        dob: dateToDateString(editCustomer.dob),
        balance: editCustomer.balance,
        type: editCustomer.encryption,
        active: editCustomer.active,
      }
    )
    setIsFormOpen({ status: true, editOrAdd: 'edit', _id: editCustomer._id });
    console.log('Edit customer');
  };

  const handleDeleteClick = (id) => {
    //
    console.log('Delete customer', id);
  };

  const handleStartClick = (id) => {
    //
    console.log('Start customer', id);
  };

  const handleStopClick = (id) => {
    //
    console.log('Stop customer', id);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  UUID
                </TableCell>
                <TableCell align="center">
                  Name
                </TableCell>
                <TableCell align="center">
                  Date of Birth
                </TableCell>
                <TableCell align="center">
                  Balance
                </TableCell>
                <TableCell align="center">
                  Type
                </TableCell>
                <TableCell align="center">
                  Active
                </TableCell>
                <TableCell align="center">
                  Last Modified
                </TableCell>
                <TableCell align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer, index) => {
                const isSelected = selected.includes(customer.uuid);
                const dOB = customer.dob ? dateToDateString(customer.dob) : 'N/A'; 
                const lastModified = customer.last_modified ? dateToString(customer.last_modified) : 'N/A';
                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.uuid);
                          } else {
                            onDeselectOne?.(customer.uuid);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {customer.uuid}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      {dOB}
                    </TableCell>
                    <TableCell align="right">
                      {customer.balance}
                    </TableCell>
                    <TableCell align="center">
                      {customer.encryption}
                    </TableCell>
                    <TableCell align="center">
                      {/* Use &#x2705; as Yes and &#x274C; as No */}
                      &#x2705;
                    </TableCell>
                    <TableCell align="center">
                      {lastModified}
                    </TableCell>
                    <TableCell align="center"
                    >
                      <Stack
                        direction="row"
                      >
                        <IconButton
                          aria-label="activate"
                          color="success"
                        >
                          <PlayArrow />
                        </IconButton>
                        <IconButton
                          aria-label="deactivate"
                        >
                          <Stop />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          color='warning'
                          onClick={() => handleEditClick(customer._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                        >
                          <DeleteIcon />
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  isFormOpen: PropTypes.object.isRequired,
  setIsFormOpen: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
