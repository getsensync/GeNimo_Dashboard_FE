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

import { toFullString, toDateString } from 'src/utils/function';
import axios from 'axios';
import { baseUrl } from 'src/utils/backend-url';

const deleteUrl = baseUrl + "/management/spots/delete/";
const activationUrl = baseUrl + "/activation/spot/";

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
    const deleteUserUrl = deleteUrl + spotid;
    axios
      .delete(deleteUserUrl)
      .then((res) => {
        console.log(res);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('Delete spot', spotid);
  };

  const handleActivationClick = (spotid, current) => {
    const url = activationUrl + spotid;
    axios
      .put(url, { new_status: !current })
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
                const isSelected = selected.includes(item.spotid);
                const lastModified = item.lastmodified ? toFullString(item.lastmodified) : 'N/A';
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
                            onSelectOne?.(item.spotid);
                          } else {
                            onDeselectOne?.(item.spotid);
                          }
                        }}
                      />
                    </TableCell>
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
                      {item.price}
                    </TableCell>
                    <TableCell align="center">
                      {/* Use &#x2705; as Yes and &#x274C; as No */}
                      {item.isactive ? <span>&#x2705;</span> : <span>&#x274C;</span>}
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
