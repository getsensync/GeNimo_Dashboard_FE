import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from 'src/hooks/use-auth';
import { serverUrl } from 'src/utils/backend-url';
import { toCapitalCase } from 'src/utils/function';

export const AccountProfileDetails = () => {

  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '08',
      gender: 'male',
    },
    validationSchema: Yup.object({
      firstName: Yup
        .string()
        .max(255)
        .required('First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required('Last name is required'),
      phone: Yup
        .number()
        .typeError('Must be a number')
        .min(99999999, 'Must be at least 10 digits')
        .max(99999999999999, 'Must be at most 15 digits')
        .required('Phone number is required'),
    }),
    onSubmit: (values, helpers) => {
      const data = {
        username: user?.username,
        first_name: toCapitalCase(values.firstName),
        last_name: toCapitalCase(values.lastName),
        phone: values.phone,
      };
      try {
        axios.patch(`${serverUrl}/credentials/changeProfile`, data)
          .then((response) => {
            toast.success('Please re-login to see the changes');
            toast.success('Profile updated successfully!');
          }
          ).catch((error) => {
            toast.error('Error updating password');
          });
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        toast.error('Error updating profile');
      }
    }
  });
    
  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Account details of Staff"
          title="Profile"
          sx={{ py: 1 }}
        />
        <CardContent sx={{ py: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={2}
            >
              <Grid
                xs={12}
                md={6}
              >
                {/* Username */}
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={user?.username}
                  InputProps={{
                    readOnly: true,
                    style: { pointerEvents: "none" }
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={user?.email}
                  InputProps={{
                    readOnly: true,
                    style: { pointerEvents: "none" }
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  error={!!(formik.touched.firstName && formik.errors.firstName)}
                  fullWidth
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  label="First Name"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='text'
                  value={formik.values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Last Name"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='text'
                  value={formik.values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                {/* Phone Number */}
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone Number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='text'
                  value={formik.values.phone}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end', mr: 2 }}>
          <Button
            variant="contained"
            type="submit"
            size="large"
          >
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
