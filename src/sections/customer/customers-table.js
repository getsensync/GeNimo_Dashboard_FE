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
import React, { useState } from 'react';
import { Edit as EditIcon, Delete as DeleteIcon, PlayArrow, Stop } from '@mui/icons-material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

import { toFullString, toDateString, toDateStrip } from 'src/utils/function';
import axios from 'axios';
import { baseUrl } from 'src/utils/backend-url';
import { CustomersConfirmDelete } from './customers-confirm-delete';

const activationUrl = baseUrl + "/activation/customer/";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    isFormOpen,
    setIsFormOpen,
    formData,
    setFormData,
  } = props;

  const [isDeleting, setIsDeleting] = useState({ status: false, id: null });

  const handleEditClick = (customerid) => {
    const edited = items.find((item) => item.customerid === customerid);
    setFormData(
      {
        uuid: edited.customeruuid,
        name: edited.customername,
        dob: toDateStrip(edited.dateofbirth),
        balance: edited.balance,
        type: edited.encryptiontype,
        active: edited.isactive,
      }
    )
    setIsFormOpen({ status: true, editOrAdd: 'edit', id: edited.customerid });
    console.log('Edit customer');
  };

  const handleDeleteClick = (customerid) => {
    setIsDeleting({ status: true, id: customerid });
  };

  const handleActivationClick = (customerid, current) => {
    const url = activationUrl + customerid;
    axios
      .patch(url, { new_status: !current })
      .then((res) => {
        console.log(res);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>                
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
              {items.map((item, index) => {                
                const dOB = item.dateofbirth ? toDateString(item.dateofbirth) : 'N/A';
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
                      {dOB}
                    </TableCell>
                    <TableCell align="right">
                      {item.balance}
                    </TableCell>
                    <TableCell align="center">
                      {item.encryptiontype}
                    </TableCell>
                    <TableCell align="center" padding='checkbox'>
                      {/* Use checkbox to show active/inactive but cant be selected */}
                      <Checkbox
                        checked={item.isactive}
                        disabled
                      />
                    </TableCell>
                    <TableCell align="center">
                      {lastModified}
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        justifyContent="center"
                      >
                        {!item.isactive && (
                          <IconButton
                            aria-label="activate"
                            color="success"
                            onClick={() => handleActivationClick(item.customerid, item.isactive)}
                          >
                            <PlayArrow />
                          </IconButton>
                        )}
                        {item.isactive && (
                          <IconButton
                            aria-label="deactivate"
                            color="error"
                            onClick={() => handleActivationClick(item.customerid, item.isactive)}
                          >
                            <Stop />
                          </IconButton>
                        )}
                        <IconButton
                          aria-label="edit"
                          color='warning'
                          onClick={() => handleEditClick(item.customerid)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteClick(item.customerid)}
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
      {isDeleting.status && (
        <CustomersConfirmDelete
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          id={isDeleting.id}
        />
      )}
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  isFormOpen: PropTypes.object.isRequired,
  setIsFormOpen: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
