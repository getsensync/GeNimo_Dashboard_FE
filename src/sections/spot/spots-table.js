import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

import { toFullString, toDateString } from 'src/utils/function';
import axios from 'axios';
import { toast } from 'react-toastify';
import { serverUrl } from 'src/utils/backend-url';
import { SpotsConfirmDelete } from './spots-confirm-delete';

const deleteUrl = serverUrl + "/management/spots/delete/";
const activationUrl = serverUrl + "/activation/spot/";

export const SpotsTable = (props) => {
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
    fetchSpots,
  } = props;

  const [isDeleting, setIsDeleting] = useState({ status: false, id: null });

  const handleEditClick = (spotid) => {
    const edited = items.find((item) => item.spotid === spotid);
    setFormData(
      {
        name: edited.spotname,
        price: edited.price,
        active: edited.isactive,
      }
    )
    setIsFormOpen({ status: true, editOrAdd: 'edit', id: edited.spotid });
    console.log('Edit spot');
  };

  const handleDeleteClick = (spotid) => {
    setIsDeleting({ status: true, id: spotid });
  };

  const handleActivationClick = (spotid, current) => {
    const url = activationUrl + spotid;
    axios
      .patch(url, { new_status: !current })
      .then((res) => {
        console.log(res);
        fetchSpots();
        const newStatus = !current ? 'activated' : 'deactivated';
        toast.success(`Spot ${newStatus} successfully!`);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Spot ${newStatus} failed!`);
      });
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>                
                <TableCell align="center">
                  Name
                </TableCell>                
                <TableCell align="center">
                  Price
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
                const lastModified = item.lastmodified ? toFullString(item.lastmodified) : 'N/A';
                return (
                  <TableRow
                    hover
                    key={index}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={item.avatar}>
                          {getInitials(item.spotname)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {item.spotname}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      {item.price}.000 IDR
                    </TableCell>
                    <TableCell
                      align="center"
                      padding='checkbox'
                    >
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
                            onClick={() => handleActivationClick(item.spotid, item.isactive)}
                          >
                            <PlayArrow />
                          </IconButton>
                        )}
                        {item.isactive && (
                          <IconButton
                            aria-label="deactivate"
                            color="error"
                            onClick={() => handleActivationClick(item.spotid, item.isactive)}
                          >
                            <Stop />
                          </IconButton>
                        )}
                        <IconButton
                          aria-label="edit"
                          color='warning'
                          onClick={() => handleEditClick(item.spotid)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteClick(item.spotid)}
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
        <SpotsConfirmDelete
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          fetchSpots={fetchSpots}
        />
      )}
    </Card>
  );
};

SpotsTable.propTypes = {
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
  fetchSpots: PropTypes.func.isRequired,
};
