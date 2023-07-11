import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

import { readerUrl } from 'src/utils/backend-url';
import axios from 'axios';

export const LogsForm = (props) => {
  const {
    isFormOpen,
    setIsFormOpen,
    formData,
    setFormData,
  } = props;
  
  const formik = useFormik({
    initialValues: formData,
    validationSchema: Yup.object({
      // uuid is a string with 8 characters
      uuid: Yup
        .string()
        .length(8)
        .required('UUID is required'),
      // amount is a number
      amount: Yup
        .number('Must be a number')
        .required('Amount is required'),
      // type is a select with 3 options
      type: Yup
        .string()
        .oneOf(['create', 'deposit'])
        .required('Type is required'),
    }),
    onChange: (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    },
    onSubmit: async (values, helpers) => {
      try {
        // get all values to a variable
        const uuid = values.uuid;
        const amount = values.amount;
        const type = values.type;
        const resultData = { 
          uuid: uuid,
          amount: amount,
        };
        console.log(resultData);
        // send data to backend Reader based on type
        // ...............................................
        if (type === 'create') {
          const url = readerUrl + "/createNewUser";
          axios
          .post(url, {user_uuid: uuid})
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        } else if (type === 'deposit') {
          const url = readerUrl + "/topUp";
          axios
          .post(url, {amount: amount})
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        }
        // ...............................................
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        resetForm();
        // window.location.reload();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
      
    }
  });

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setIsFormOpen({ status: false });
    setFormData({
      uuid: '00000000',
      amount: '0',
      type: 'create',
    });
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
            px: 3,
            py: '50px',
            mt: '50px',
            width: '80%',
            backgroundColor: 'background.paper',
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography
                variant="h5"
                align="center"
              >
                Reader Trigger
              </Typography>
              <Typography
                variant="body2"
                align="center"
              >
                Create user using Uuid -- Deposits using Amount
              </Typography>              
            </Stack>            
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                {/* form for uuid, name, dob, amount, type */}
                <TextField
                  error={!!(formik.touched.uuid && formik.errors.uuid)}
                  fullWidth
                  helperText={formik.touched.uuid && formik.errors.uuid}
                  label="UUID"
                  name="uuid"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="uuid"
                  value={formik.values.uuid}
                  required
                />
                <TextField
                  error={!!(formik.touched.amount && formik.errors.amount)}
                  fullWidth
                  helperText={formik.touched.amount && formik.errors.amount}
                  label="Amount"
                  name="amount"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.amount}
                  required
                />
                {/* type is a select with 2 options */}
                <FormControl
                  fullWidth
                  required
                >
                  <InputLabel id="type">Trigger Type</InputLabel>
                  <Select
                    labelId="type"
                    error={!!(formik.touched.type && formik.errors.type)}
                    fullWidth
                    helperText={formik.touched.type && formik.errors.type}
                    label="Type"
                    name="type"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.type}
                  >
                    <MenuItem value="create">Create User</MenuItem>
                    <MenuItem value="deposit">Top Up User</MenuItem>
                  </Select>
                </FormControl>
                
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              {/* Stack 2 button as a row, such as Submit and Cancel */}
              <Stack
                direction="row"
                spacing={5}
                sx={{ mt: 7, mb: 5 }}
              >
                <Button
                  color="error"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  color="success"
                  disabled={formik.isSubmitting}  
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={formik.handleSubmit}
                >
                  Trigger
                </Button>
              </Stack>
            </form>
          </div>
        </Box>
      </Box>
  );
};

LogsForm.propTypes = {
  isFormOpen: PropTypes.object.isRequired,
  setIsFormOpen: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
