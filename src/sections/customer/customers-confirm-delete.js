import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material';

import { serverUrl } from 'src/utils/backend-url';
import axios from 'axios';
import { toast } from 'react-toastify';

const deleteUrl = serverUrl + "/management/customers/delete/";

export const CustomersConfirmDelete = (props) => {
  const {
    id,
    isDeleting,
    setIsDeleting,
    fetchCustomers,
  } = props;
  
  const handleDelete = () => {
    const deleteUserUrl = deleteUrl + id;
    axios
      .delete(deleteUserUrl)
      .then((res) => {
        console.log(res);
        fetchCustomers();
        toast.success('Customer deleted successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Customer deleted failed');
      });
    setIsDeleting({ status: false, id: null });
  };

  const handleCancel = () => {
    setIsDeleting({ status: false, id: null });
  };

  return (
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          position: 'fixed',
          top: '-24px',
          left: 0,
          right: 0,
          bottom: 0,
          pl: '18.5%',
          overflow: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1280,
            px: 5,
            py: '50px',
            mt: '50px',
            width: '80%',
            backgroundColor: 'background.paper',
          }}
        >
          <div>
            <Stack
              spacing={3}
              sx={{ mb: 2 }}
            >
              <Typography
                variant="h5"
                align="center"
              >
                Delete Customer Confirmation
              </Typography>
              {/* Remind user that Customer can be deactivate instead of delete */}
              <Stack>
                <Typography
                  variant="body2"
                  align="center"
                >
                  Are you sure you want to delete this customer? This action cannot be undone.
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                >
                  If you want to deactivate this customer, please click Cancel and then click &lsquo;Pause&rsquo; button.
                </Typography>
              </Stack>
            </Stack>
            {/* Stack 2 button as a row, such as Submit and Cancel */}
            <Stack
              direction="row"
              spacing={6}
              sx={{ mt: 5 }}
            >
              <Button
                color="secondary"
                disabled={!isDeleting.status}
                fullWidth
                size="large"
                variant="contained"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                color="error"
                disabled={!isDeleting.status}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Stack>
          </div>
        </Box>
      </Box>
  );
};

CustomersConfirmDelete.propTypes = {
  id: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  setIsDeleting: PropTypes.func.isRequired,
  fetchCustomers: PropTypes.func.isRequired,
};
