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

import { dateToString, dateToDateString } from 'src/utils/function';
import axios from 'axios';
import { baseUrl } from 'src/utils/backend-url';

const deleteUrl = baseUrl + "/deleteData/spot/byId/";
const activationUrl = baseUrl + "/updateData/spot/";

export const SpotsTable = (props) => {
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
    const editSpot = items.find((spot) => spot._id === _id);
    setFormData(
      {
        uuid: editSpot.uuid,
        name: editSpot.name,
        price: editSpot.price,
        active: editSpot.active,
      }
    )
    setIsFormOpen({ status: true, editOrAdd: 'edit', _id: editSpot._id });
    console.log('Edit spot');
  };

  const handleDeleteClick = (_id) => {
    const deleteUserUrl = deleteUrl + _id;
    axios
      .delete(deleteUserUrl)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('Delete spot', id);
  };

  const handleActivationClick = (uuid, current) => {
    const activateUrl = activationUrl + "activate/" + uuid;
    const deactivateUrl = activationUrl + "deactivate/" + uuid;
    const url = current ? deactivateUrl : activateUrl;
    axios
      .patch(url)
      .then((res) => {
        console.log(res);
        window.location.reload();
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
                  Price
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
              {items.map((spot, index) => {
                const isSelected = selected.includes(spot.uuid);
                const dOB = spot.dob ? dateToDateString(spot.dob) : 'N/A'; 
                const lastModified = spot.last_modified ? dateToString(spot.last_modified) : 'N/A';
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
                            onSelectOne?.(spot.uuid);
                          } else {
                            onDeselectOne?.(spot.uuid);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {spot.uuid}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={spot.avatar}>
                          {getInitials(spot.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {spot.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      {dOB}
                    </TableCell>
                    <TableCell align="right">
                      {spot.price}
                    </TableCell>
                    <TableCell align="center">
                      {spot.encryption}
                    </TableCell>
                    <TableCell align="center">
                      {/* Use &#x2705; as Yes and &#x274C; as No */}
                      {spot.active ? <span>&#x2705;</span> : <span>&#x274C;</span>}
                    </TableCell>
                    <TableCell align="center">
                      {lastModified}
                    </TableCell>
                    <TableCell align="center"
                    >
                      <Stack
                        direction="row"
                      >
                        {!spot.active && (
                          <IconButton
                            aria-label="activate"
                            color="success"
                            onClick={() => handleActivationClick(spot.uuid, spot.active)}
                          >
                            <PlayArrow />
                          </IconButton>
                        )}
                        {spot.active && (
                          <IconButton
                            aria-label="deactivate"
                            color="error"
                            onClick={() => handleActivationClick(spot.uuid, spot.active)}
                          >
                            <Stop />
                          </IconButton>
                        )}
                        <IconButton
                          aria-label="edit"
                          color='warning'
                          onClick={() => handleEditClick(spot._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteClick(spot._id)}
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

SpotsTable.propTypes = {
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
