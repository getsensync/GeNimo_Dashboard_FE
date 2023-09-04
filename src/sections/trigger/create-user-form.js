import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import axios from 'axios';
import { toast } from 'react-toastify';

export const CreateUserForm = (props) => {
  const {
    setIsFormOpen,
    readerUrl,
  } = props;
  
  const [formData, setFormData] = useState({
    uuid: '',
  });
  
  const formik = useFormik({
    initialValues: formData,
    validationSchema: Yup.object({
      // uuid is a string with 8 characters
      uuid: Yup
        .string()
        .length(8)
        .required('UUID is required'),
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
        // send data to backend Reader based on type
        const url = readerUrl + "/createNewUser";
          axios
          .post(url, {user_uuid: uuid})
          .then((res) => {
            console.log(res.data);
            if (res.status === 202) {
              toast.success(<p>Command CreateUser sent to Reader<br/>Please check the Reader</p>);
              // toast.success(`Bracelet: UUID ${uuid} Granted`);
              // toast.success('Trigger Create User Success');
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error('Trigger Create User Failed');
          });
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
    setIsFormOpen(false);
    setFormData({
      uuid: '',
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
                Create New User
              </Typography>
              <Typography
                variant="body2"
                align="center"
              >
                Please Check the UUID First at Dashboard / Bracelet
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.uuid && formik.errors.uuid)}
                  fullWidth
                  helperText={formik.touched.uuid && formik.errors.uuid}
                  label="UUID"
                  name="uuid"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.uuid}
                  required
                />
                
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

CreateUserForm.propTypes = {
  setIsFormOpen: PropTypes.func.isRequired,
  readerUrl: PropTypes.string.isRequired,
};
